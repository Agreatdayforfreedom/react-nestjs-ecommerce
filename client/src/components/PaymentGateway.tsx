import React, { FC } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { HiCreditCard } from 'react-icons/hi';
import { FaReceipt } from 'react-icons/fa';
import { Enum_PurchaseStatus } from '../enums';

export enum Step {
  order = 'ORDER',
  payment = 'PAYMENT',
  purchase = 'PURCHASE',
}
interface Props {
  locationStatus: Step;
  purchaseStatus: Enum_PurchaseStatus;
}

export const PaymentGateway: FC<Props> = ({
  locationStatus,
  purchaseStatus,
}) => {
  return (
    <div className="flex items-center justify-around w-5/6 mx-auto my-4">
      <div
        className={`flex justify-center items-center w-16 h-8 rounded-full ${
          locationStatus === Step.order ||
          locationStatus === Step.payment ||
          locationStatus === Step.purchase
            ? 'bg-orange-400 border-4 border-orange-400'
            : 'bg-gray-400 border-4 border-gray-400'
        } ${
          purchaseStatus === Enum_PurchaseStatus.PENDING_PAYMENT_METHOD ||
          purchaseStatus === Enum_PurchaseStatus.PENDING_PAYMENT ||
          purchaseStatus === Enum_PurchaseStatus.PURCHASE
            ? 'relative step_purchase'
            : purchaseStatus === Enum_PurchaseStatus.CANCELLED
            ? 'relative step_cancelled !bg-slate-400 border-4 !border-slate-400'
            : ''
        }`}
      >
        <FaReceipt className="text-white" />
      </div>
      <div
        className={`w-full 
        h-0.5 flex items-center ${
          locationStatus === Step.order ||
          locationStatus === Step.payment ||
          locationStatus === Step.purchase
            ? 'border border-orange-400'
            : 'border border-slate-400'
        } ${
          purchaseStatus === Enum_PurchaseStatus.CANCELLED &&
          'border !border-slate-400'
        }`}
      ></div>
      <div
        className={`flex justify-center items-center w-16 h-8 rounded-full ${
          locationStatus === Step.payment || locationStatus === Step.purchase
            ? 'bg-orange-400 border-4 border-orange-400'
            : 'bg-gray-400 border-4 border-gray-400'
        } ${
          purchaseStatus === Enum_PurchaseStatus.PENDING_PAYMENT ||
          purchaseStatus === Enum_PurchaseStatus.PURCHASE
            ? 'relative step_purchase !bg-orange-400 !border-4 !border-orange-400'
            : purchaseStatus === Enum_PurchaseStatus.CANCELLED
            ? 'relative step_cancelled !bg-slate-400 border-4 !border-slate-400'
            : ''
        }`}
      >
        <HiCreditCard size={20} className="text-white" />
      </div>
      <div
        className={`w-full 
      h-0.5 flex items-center ${
        locationStatus === Step.payment || locationStatus === Step.purchase
          ? 'border border-orange-400'
          : 'border border-slate-400'
      } ${
          purchaseStatus === Enum_PurchaseStatus.PURCHASE
            ? 'border border-orange-400'
            : purchaseStatus === Enum_PurchaseStatus.CANCELLED
            ? 'border border-slate-400'
            : 'border border-slate-400'
        }`}
      ></div>
      <div
        className={`flex justify-center items-center w-16 h-8 rounded-full ${
          locationStatus === Step.purchase
            ? 'bg-orange-400 border-4 border-orange-400'
            : 'bg-gray-400 border-4 border-gray-400'
        } ${
          purchaseStatus === Enum_PurchaseStatus.PURCHASE
            ? 'relative step_purchase !bg-orange-400 !border-4 !border-orange-400'
            : purchaseStatus === Enum_PurchaseStatus.CANCELLED
            ? 'relative step_cancelled !bg-slate-400 border-4 !border-slate-400'
            : ''
        }`}
      >
        <GiCheckMark className="text-white" />
      </div>
    </div>
  );
};
