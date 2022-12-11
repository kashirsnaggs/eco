import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/User';
import db from '../../../lib/db';
import { escapeHtml, stripslashes } from '../../../lib/validationFuns';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      if (user?.isStaff) token.isStaff = user.isStaff;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      if (token?.isStaff) session.user.isStaff = token.isStaff;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {

                await db.connect();
                        const user = await User.findOne({ email: stripslashes(escapeHtml(credentials.email)) });
                await db.disconnect();

                if (user && bcryptjs.compareSync(escapeHtml(credentials.password), user.password)) {
                return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        image: 'f',
                        isAdmin: user.isAdmin,
                        isStaff: user.isStaff,
                };
                }
                throw new Error('Invalid email or password');
      },
    }),
  ],
});