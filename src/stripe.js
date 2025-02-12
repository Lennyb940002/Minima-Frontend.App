const express = require('express');
const stripe = require('stripe')('votre_clé_secrète_stripe');
const app = express();

const endpointSecret = 'whsec_votre_clé_secrète_webhook';

// Route pour résilier un abonnement
app.post('/cancel-subscription', express.json(), async (req, res) => {
    try {
        const { subscriptionId } = req.body;

        if (!subscriptionId) {
            return res.status(400).json({ error: 'ID d\'abonnement requis' });
        }

        // Récupérer l'abonnement
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Vérifier si l'abonnement existe et est actif
        if (!subscription || subscription.status !== 'active') {
            return res.status(404).json({ error: 'Abonnement non trouvé ou inactif' });
        }

        // Résilier l'abonnement
        const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId, {
            // Résilier immédiatement (true) ou à la fin de la période (false)
            prorate: true,
        });

        // Envoyer un email de confirmation de résiliation
        await sendCancellationConfirmation(subscription.customer);

        res.json({
            success: true,
            message: 'Abonnement résilié avec succès',
            subscription: canceledSubscription
        });

    } catch (error) {
        console.error('Erreur lors de la résiliation:', error);
        res.status(500).json({ error: 'Erreur lors de la résiliation de l\'abonnement' });
    }
});

// Webhook pour gérer les événements Stripe
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`Erreur de signature: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Paiement réussi:', paymentIntent.id);
            await handleSuccessfulPayment(paymentIntent);
            break;

        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.log('Paiement échoué:', failedPayment.id);
            await handleFailedPayment(failedPayment);
            break;

        case 'customer.subscription.created':
            const subscription = event.data.object;
            console.log('Nouvelle souscription:', subscription.id);
            await handleNewSubscription(subscription);
            break;

        case 'customer.subscription.deleted':
            const canceledSubscription = event.data.object;
            console.log('Souscription annulée:', canceledSubscription.id);
            await handleCanceledSubscription(canceledSubscription);
            break;

        case 'customer.subscription.updated':
            const updatedSubscription = event.data.object;
            console.log('Souscription mise à jour:', updatedSubscription.id);
            await handleUpdatedSubscription(updatedSubscription);
            break;

        default:
            console.log(`Event non géré: ${event.type}`);
    }

    res.json({ received: true });
});

// Fonctions de gestion
async function handleSuccessfulPayment(paymentIntent) {
    try {
        await updateOrderStatus(paymentIntent.metadata.orderId, 'paid');
        await sendConfirmationEmail(paymentIntent.metadata.customerEmail);
        await updateInventory(paymentIntent.metadata.orderId);
    } catch (error) {
        console.error('Erreur lors du traitement du paiement réussi:', error);
    }
}

async function handleFailedPayment(paymentIntent) {
    try {
        await updateOrderStatus(paymentIntent.metadata.orderId, 'failed');
        await sendPaymentFailureEmail(paymentIntent.metadata.customerEmail);
    } catch (error) {
        console.error('Erreur lors du traitement du paiement échoué:', error);
    }
}

async function handleNewSubscription(subscription) {
    try {
        await activateSubscriptionServices(subscription.customer);
        await sendWelcomeEmail(subscription.customer);
    } catch (error) {
        console.error('Erreur lors du traitement de la nouvelle souscription:', error);
    }
}

async function handleCanceledSubscription(subscription) {
    try {
        await deactivateSubscriptionServices(subscription.customer);
        await sendCancellationEmail(subscription.customer);

        // Mettre à jour le statut dans votre base de données
        await updateSubscriptionStatus(subscription.id, 'cancelled');

        // Enregistrer la date de fin d'abonnement
        await logSubscriptionEndDate(subscription.id, subscription.current_period_end);
    } catch (error) {
        console.error('Erreur lors du traitement de l\'annulation:', error);
    }
}

async function handleUpdatedSubscription(subscription) {
    try {
        // Gérer les changements de plan ou de statut
        await updateSubscriptionDetails(subscription.id, {
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end,
            plan: subscription.plan.id
        });

        // Notifier le client si nécessaire
        await sendSubscriptionUpdateNotification(subscription.customer);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'abonnement:', error);
    }
}

async function sendCancellationConfirmation(customerId) {
    // Implémenter l'envoi d'email de confirmation de résiliation
    // Exemple : utiliser votre service d'emails (Sendgrid, Mailgun, etc.)
    console.log(`Envoi de la confirmation de résiliation au client ${customerId}`);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur webhook écoutant sur le port ${port}`));