export const RightClickAddress = ({ lat, lon, onSave, labelButton }) => {
    return (
      <div
        style={{
          position: "absolute",
          top: `${lat}px`,
          left: `${lon}px`,
          backgroundColor: "white",
          border: "1px solid black",
          padding: "10px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* <button onClick={onSaveStartPoint} className="hover:bg-gray-200">Chọn điểm đi</button> */}
        <button onClick={onSave} className="hover:bg-gray-200">{labelButton}</button>
      </div>
    );
  };