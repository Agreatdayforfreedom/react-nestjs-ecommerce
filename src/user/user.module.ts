import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './entities/customers.entity';
import { Orders } from './entities/orders.entity';
import { Order_details } from './entities/order_details.entity';
import { User } from './entities/user.entity';
import { UserService } from './services/user/user.service';
import { CustomersController } from './controller/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { OrderService } from './services/order/order.service';
import { OrderController } from './controller/order/order.controller';
import { CartController } from './controller/cart/cart.controller';
import { CartService } from './services/cart/cart.service';
import { Cart } from './entities/cart.entity';
import { Cart_item } from './entities/cart_item.entity';
import { BookModule } from '../book/book.module';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './services/payment/payment.service';
import { PaymentController } from './controllers/payment/payment.controller';
import { Shipper } from './entities/shipper.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Customers,
      Order_details,
      Orders,
      Cart,
      Cart_item,
      Payment,
      Shipper,
    ]),
    forwardRef(() => BookModule),
  ],
  providers: [
    UserService,
    CustomersService,
    OrderService,
    CartService,
    PaymentService,
  ],
  exports: [UserService, TypeOrmModule],
  controllers: [
    CustomersController,
    OrderController,
    CartController,
    PaymentController,
  ],
})
export class UserModule {}
