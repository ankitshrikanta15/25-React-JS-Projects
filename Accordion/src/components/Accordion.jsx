import { useState } from "react";
import data from "../utils/data";

// Single Selection ✅
// multi-Selection
const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (getCurrentId) => {
    console.log(getCurrentId);
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };

  const handleMultiSelection = (getCurrentId) => {
    let cpyMultiple = [...multiple];
    if (cpyMultiple.includes(getCurrentId)) {
      cpyMultiple = cpyMultiple.filter(item => item !== getCurrentId);
    } else {
      cpyMultiple.push(getCurrentId);
    }
    setMultiple(cpyMultiple);
  };

  return (
    <div className="wrapper flex justify-center items-center flex-col gap-5">
      <button
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
        className="p-5 bg-black text-white rounded-md hover:bg-slate-500"
      >
        {enableMultiSelection ? "Disable" : "Enable"} multi-selection
      </button>
      <div className="accordion w-[500px]">
        {data && data.length > 0 ? (
          data.map((dataItems) => (
            <div className="item bg-stone-600 m-3" key={data.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItems.id)
                    : () => handleSingleSelection(dataItems.id)
                }
                className="title flex items-center justify-between font-semibold gap-4 p-5 text-2xl text-white cursor-pointer"
              >
                <h3>{dataItems.placeName}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection ? (
                multiple.includes(dataItems.id) ? (
                  <>
                    <div className="content1 text-yellow-50">
                      {dataItems.placeLocation}
                    </div>
                    <div className="content2 text-yellow-50">
                      {dataItems.placeDescription}
                    </div>
                  </>
                ) : null
              ) : (
                selected === dataItems.id ? (
                  <>
                    <div className="content1 text-yellow-50">
                      {dataItems.placeLocation}
                    </div>
                    <div className="content2 text-yellow-50">
                      {dataItems.placeDescription}
                    </div>
                  </>
                ) : null
              )}
            </div>
          ))
        ) : (
          <div>No Data Found.</div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
