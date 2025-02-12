export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    // Au moins 8 caractères, une majuscule, une minuscule, un chiffre
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};

export const validateCardNumber = (cardNumber: string): boolean => {
    const cardNumberRegex = /^[0-9]{16}$/;
    return cardNumberRegex.test(cardNumber.replace(/\s/g, ''));
};

export const validateExpiryDate = (expiryDate: string): boolean => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiryDate)) return false;

    const [month, year] = expiryDate.split('/').map(Number);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    return year > currentYear || (year === currentYear && month >= currentMonth);
};

export const validateCVV = (cvv: string): boolean => {
    const cvvRegex = /^[0-9]{3,4}$/;
    return cvvRegex.test(cvv);
};

export const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        return parts.join(' ');
    }
    return value;
};