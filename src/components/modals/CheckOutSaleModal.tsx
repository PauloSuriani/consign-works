import React from 'react';

interface ModalProps {
  showCheckOut: boolean;
  totalSum: number;
  onClose: () => void;
  onConfirm: (paymentMethod: string) => void;
}

const CheckOutSaleModal: React.FC<ModalProps> = ({
  showCheckOut,
  totalSum,
  onClose,
  onConfirm,
}) => {
  if (!showCheckOut) return null;

  const dateSetUp = () => {
    const orderDate = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const day = pad(orderDate.getDate());
    const month = pad(orderDate.getMonth() + 1);
    const year = orderDate.getFullYear();
    const hours = pad(orderDate.getHours());
    const minutes = pad(orderDate.getMinutes());
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  }

  const [paymentMethod, setPaymentMethod] = React.useState<number>(1);
  const [otherPayment, setOtherPayment] = React.useState<string>('');
  return (
    <div className="modal text-black">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className='text-lg ml-2 mb-3'>Confirme a venda</h2>
        <div className='flex justify-between items-center mb-2'>
          <div className='mr-1'>
            Em
          </div>
          <div>{dateSetUp()}</div>
        </div>
        <div className='flex justify-between items-center mb-2'>
          <div className='mr-1'>
            Total
          </div>
          <div >
            R$ {totalSum.toFixed(2)}
          </div>
        </div>
        <div className='flex justify-center mb-2'>
          <div className="flex flex-col items-center">
            <select
              className='text-center mx-2 bg-gray-200 w-[100%] h-[50px] border border-gray-300 rounded-lg appearance-none'
              value={paymentMethod}
              onChange={e => setPaymentMethod(Number(e.target.value))}
            >
              <option className='' value="1">Forma de pagamento</option>
              <option value="2">Dinheiro</option>
              <option value="4">Pix</option>
              <option value="3">Cartão débido / crédito</option>
              <option value="5">Boleto</option>
              <option value="6">Cheque</option>
              <option value="7">(Outro)</option>
            </select>
            {paymentMethod === 7 && (
              <input
                className="mt-3 border w-full border-gray-300 rounded-lg px-2"
                type="text"
                placeholder="Descreva a forma de pagamento"
                value={otherPayment}
                onChange={e => setOtherPayment(e.target.value)}
              />
            )}
          </div>
        </div>
        <div className='flex flex-col '>
          <div>
            <input
              type="checkbox"
              id="discount-checkbox"
              name="discount"
              value="5"
            />
            <label className='pt-2 ml-1' htmlFor="discount-checkbox">5% desconto à vista</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="discount-checkbox"
              name="discount"
              checked
              value="5"
            />
            <label className='pt-2 ml-1' htmlFor="discount-checkbox">Gerar via cliente?</label>
          </div>
        </div>
        <footer className='flex justify-between mt-4'>
          <button className='bg-gray-300 text-black p-2 rounded-md' onClick={onClose}>Sair</button>
          <button className='bg-consigna text-white p-2 rounded-md' onClick={() => {
            let paymentMethodAux = '';
            if (paymentMethod === 7) {
              paymentMethodAux = otherPayment;
            }
            else if (paymentMethod === 1) {
              paymentMethodAux = 'Dinheiro';
            }
            else if (paymentMethod === 2) {
              paymentMethodAux = 'Pix';
            }
            else if (paymentMethod === 3) {
              paymentMethodAux = 'Cartão débido / crédito';
            }
            else if (paymentMethod === 4) {
              paymentMethodAux = 'Boleto';
            }
            else if (paymentMethod === 5) {
              paymentMethodAux = 'Cheque';
            };
            onConfirm(paymentMethodAux);
            onClose();
          }}>Confirmar</button>
        </footer>
      </div>
    </div>
  );
};

export default CheckOutSaleModal;
