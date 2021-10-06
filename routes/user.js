   
import * as express from 'express'
import { body, validationResult } from 'express-validator';
import { DatabaseConnection } from '../DatabaseConnection.js';
import { SELECT_USER_QUERY, INSERT_USER_QUERY, GET_USERS, UPDATE_USER, DELETE_USER } from '../queries.js'
import { auth } from '../middleware/auth.js'
import jwt from 'jsonwebtoken';
export const router = express.Router();


router.post(
    '/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        try {
            // Validating request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email, password } = req.body;
            const dbConnection = new DatabaseConnection();
            const resultData = await dbConnection.query(dbConnection.getConnection(), SELECT_USER_QUERY, [ email, password ]);
            // If no user found
            if(!resultData.length){
                res.status(403).json({
                    message: 'Forbidden'
                });
            }

            const payload = {
                user: {
                  id: resultData[0].id,
                },
            };
      
            jwt.sign(
                payload,
                process.env.JWT_SECRET_KEY,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({ token });
                }
            );
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: error.message
            })
        }
});

router.post('/',
    auth,
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('firstName').isString(),
    body('lastName').isString(),
    body('mobile').isNumeric().isLength({ max:10, min: 10 }),
    async (req, res) => {
        try {
            // Validating request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password, firstName, lastName, mobile } = req.body;
            const dbConnection = new DatabaseConnection();

            await dbConnection.query(dbConnection.getConnection(), INSERT_USER_QUERY, [ firstName, lastName, email, password, mobile ]);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
});

router.get('/',
    auth,
    async (req, res) => {
        try {
            const dbConnection = new DatabaseConnection();

            const results = await dbConnection.query(dbConnection.getConnection(), GET_USERS);
            res.status(200).json({results});
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
});

router.put('/:userId',
    auth,
    body('id').isString(),
    body('password').isLength({ min: 5 }),
    body('firstName').isString(),
    body('lastName').isString(),
    body('mobile').isNumeric().isLength({ max:10, min: 10 }),
    async (req, res) => {
        try {
            // Validating request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const dbConnection = new DatabaseConnection();
            const { password, firstName, lastName, id, mobile } = req.body;

            const results = await dbConnection.query(dbConnection.getConnection(), UPDATE_USER, [ firstName, lastName, password, mobile, id ]);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
});

router.delete('/:userId',
    auth,
    async (req, res) => {
        try {
            const dbConnection = new DatabaseConnection();
            await dbConnection.query(dbConnection.getConnection(), DELETE_USER, [ req.params.userId ]);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
});
