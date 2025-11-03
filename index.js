require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize, connectDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/products', productRoutes);

// Middleware de manejo de errores (debe ser el último)
app.use(errorHandler);

// Iniciar servidor
const startServer = async () => {
  try {
    // Conectar a base de datos
    await connectDB();
    
    // Sincronizar modelo con base de datos
    await sequelize.sync();
    console.log('Database synchronized');
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
