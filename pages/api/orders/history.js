import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../lib/db';

const handler = async (req, res) => {
        const session = await getSession({ req });
        if (!session) {
                return res.status(401).send({ message: 'signin required' });
        }

        const { user } = session;

        await db.connect();
                const orders = await Order.find({ user: user._id }).sort({createdAt:-1}).lean();
        await db.disconnect();
        res.send(orders);
};

export default handler;