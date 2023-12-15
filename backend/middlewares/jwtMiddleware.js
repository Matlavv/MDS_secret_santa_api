const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.header('authorization');

        if (token !== undefined) {
            const payload = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if(error) {
                        reject(error);
                    }
                    else {
                        resolve(decoded);
                    }
                });
            });
            req.user = payload;
            next();
        } 
        else {
            res.status(403).json({message: 'Accès interdit : token manquant'});
        }
    }
    catch (error) {
        console.log(error);
        res.status(403).json({message: "Accès interdit : token invalide"});

    }
}

exports.verifyTokenInvitation = async (req, res, next) => {
    try {
        const token = req.header('authorization_invit');

        if (token !== undefined) {
            const payload = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_KEY_INVIT, (error, decoded) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                });
            });

            // vérifier le token via group id
            if (payload.groupId === req.params.group_id) {
                req.user = payload;
                next();
            } else {
                res.status(403).json({ message: 'Accès interdit : token invit invalide pour cette invitation' });
            }
        } else {
            res.status(403).json({ message: 'Accès interdit : token invit manquant' });
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: 'Accès interdit : token invit invalide' });
    }
};