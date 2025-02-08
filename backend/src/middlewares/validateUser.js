const validateUser = (req, res, next) => {
    const { user, interest, age, mobile, email } = req.body;

    if (!user || !Array.isArray(interest) || !email || !mobile || !age) {
        return res.status(400).json({ message: "Invalid user data" });
    }
    next();
};
export { validateUser };
