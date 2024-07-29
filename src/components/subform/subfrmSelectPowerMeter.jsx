import { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "./styleSubfrm";
import InputCustome from "../input/input";
import ButtonCustome from "../button/button";
import { getAvailablePowerMeters, updateStatusPowerMeter } from "@/modules/power-meters/service";
import ComboBox from "../combobox/combobox";
import { updatePowerMeterOfContract } from "@/modules/contracts/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
export default function SubfrmSelectPowerMeter({isOpen, onClose, registrationFormSelected, reload, setReload}) {
    
    
    const [powerMetersAvailable, setPowerMetersAvailable] = useState([]);
    const [powerMeterId, setPowerMeterId] = useState(null);
 
   
    useEffect(() => {
      getAvailablePowerMeters().then((res) => {
        if (res.status === 200) {
          setPowerMetersAvailable(res.data.map((powerMeter) =>({
            label: powerMeter.installationLocation,
            value: powerMeter.id
          })));
          console.log(res.data);
        }
      })
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", {
            powerMeterId: powerMeterId,
            contractId: registrationFormSelected.contractId
        });
        updatePowerMeterOfContract(registrationFormSelected.contractId, powerMeterId).then((res) => {
            if (res.status === 200) {
                console.log(res.data);
                updateStatusPowerMeter(powerMeterId, {status: 'false'}).then((res) => {
                    if (res.status === 200){
                      setReload(!reload);
                      notifySuccess("Lắp đặt đồng hồ thành công")
                      onClose(); // Đóng modal sau khi submit này
                    }
                    else{
                      console.log(res);
                      notifyError('thay đổi trạng thái thất bại' + res.message)
                    }
                })
                
            }
            else{
              notifyError('lắp đặt thất bại' + res.message)
            }
        })
       
    }
    return(
        <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Subform Modal"
    >
      <div className="flex justify-end">
        <button type="button" onClick={onClose}>
          Đóng
        </button>
      </div>
      <div className="flex justify-center mb-2">
        <div className="text-xl text-blue-600">
          Chọn đồng hồ lắp đặt
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Các trường dữ liệu nhập */}
        <div className="flex flex-row justify-between mb-4">
          <div className="w-full">
            <label className="w-1/5 font-bold">Địa chỉ cấp điện:</label>
            <div className="border-2 w-full rounded-md p-2 bg-white">{registrationFormSelected.electricitySupplyAddress}</div>
          </div>
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="w-full">
            <div className="flex items-center">
              <label htmlFor="" className="text-black font-bold">
                Vị trí đồng hồ
              </label>
            </div>
            <ComboBox
              options={powerMetersAvailable}
              onSelect={setPowerMeterId}
              className="border-2 w-full rounded-md p-2 bg-white"
            />
          </div>
          <div className="w-1/2 ml-4"></div>
        </div>

        {/* Thêm các trường khác của subform */}
        <div className="flex justify-end">
        <ButtonCustome ButtonCustome className="bg-white mr-2">
            Thêm mới
          </ButtonCustome>
          <ButtonCustome ButtonCustome type="submit" className="bg-green-500">
            Lắp đặt
          </ButtonCustome>
        </div>
      </form>
    </Modal>
    )
    
}