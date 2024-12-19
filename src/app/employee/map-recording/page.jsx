"use client";
import { useEffect, useState } from "react";
import Map from "@/components/map/Map";
import AccountSession from "@/utils/account";
import { getAssignedElectricRecordingsByEmployeeId } from "@/modules/electric-recordings/service";
import MovingVehicleMap from "@/components/map/VehicleMoving";
import BoxElectricRecording from "@/components/box/boxElectricRecording";
import { ReloadRecordingProvider, useReloadRecordingContext } from "@/components/context/reloadRecordingContext";

export default function PageMapRecording() {
  const accountSession = AccountSession.getInstance();
  const [assignedPowerMeters, setAssignedPowerMeters] = useState([]);
  const {reload, setReload} = useReloadRecordingContext();

  useEffect(() => {
    getAssignedElectricRecordingsByEmployeeId(
      accountSession.getEmployeeId()
    ).then((res) => {
      if (res.status === 200) {
        console.log(`ress ${JSON.stringify(res.data)}`);
        // setAssignedPowerMeters(res.data.map((item) => ({
        //   longitude: item.longitude,
        //   latitude: item.latitude,
        // })));
        setAssignedPowerMeters(res.data);
      }
    });
  }, [accountSession, reload]);

  return (
    <>
      
        <div>PageMapRecording</div>
        <div className="flex">
          <div
            className="w-3/4
        "
          >
            <Map
              addresses={assignedPowerMeters}
            ></Map>
          </div>
          <BoxElectricRecording></BoxElectricRecording>
        </div>
        {/* <MovingVehicleMap></MovingVehicleMap> */}

    </>
  );
}
