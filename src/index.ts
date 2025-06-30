import express from 'express';
import { sequelize } from './config/dbConnection';
import userRoutes from "./routes/user.route"
import addressRoutes from './routes/address.route'
import regisRoute from './routes/registration.route'
import sellerRoutes from './routes/seller.route'
import loginRoute from './routes/login.route'
import categoryRoutes from './routes/category.route'
import seller_productRoutes from './routes/seller_prouct.route'
import productRoutes from './routes/product.route';
import adminRoutes from './routes/admin.route';
import orderRoutes from './routes/order.route';
import cartRoutes from './routes/cart.route';
// import tempRoutes from './routes/temp.route';
import { specs, swaggerUi } from './swagger'
import { monthlystatsService } from './services/monthlystats.service';
import { cartService } from './services/cart.service';
monthlystatsService.cronSchedule();
cartService.cronManageStock();
const app = express();
app.use(express.json());


app.use('/users', userRoutes);
app.use('/addresses', addressRoutes);
app.use('/regis', regisRoute);
app.use('/sellers', sellerRoutes);
app.use('/',loginRoute);
app.use('/categories',categoryRoutes);
app.use('/seller_products',seller_productRoutes);
app.use('/products',productRoutes);
app.use('/admins',adminRoutes);
app.use('/orders',orderRoutes);
app.use('/carts',cartRoutes);
// app.use('/temp',tempRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
const PORT = process.env.PORT || 8000;

const start = async () => {
    try {
        await sequelize.authenticate();
        // await sequelize.sync({ alter: true });
        console.log('✅ Database connected');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Failed to start app:', err);
    }
};

start();