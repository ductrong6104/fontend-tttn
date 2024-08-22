'use client'
import TableComponent from "@/components/table/tableComponent";
import { getAllClient } from "@/modules/clients/service";
import { useEffect, useState } from "react";

export default function PageManagedClient (){
    const [clients, setClients] = useState([]);
    useEffect(()=>{
        getAllClient().then((res)=>{
            if(res.status === 200){
                console.log(`res.data`, res.data);
                setClients(res.data);
            }   
        })
    }, [])
    const handleClickEdit = (row) => {

    }
    const handleClickDelete = (row) => {

    }
    return(
        <div className="h-screen">
            
            <TableComponent data={clients} columns={[
                {id: "id", label:"Mã khách hàng"},
                {id: "firstName", label:"Họ"},
                {id: "lastName", label:"Tên"},
                {id: "phone", label:"SDT"},
                {id: "identityCard", label:"Căn cước"},
                {id: "birthday", label:"Ngày sinh"},
                {id: "address", label:"Địa chỉ"},
                {id: "email", label:"Email"},
            ]}
            onDelete={handleClickDelete}
            onEdit={handleClickEdit}
            ></TableComponent>
        </div>
    )
    
}