import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPopper } from "@popperjs/core";

const Dropdown = ({ color, children, buttonIcon, outerClasses }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "top-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === "black"
    ? (bgColor = "bg-black")
    : color === "white"
    ? (bgColor = "bg-blueGray-700")
    : (bgColor = "bg-" + color + "-500");

  return (
    <>
      <div className={outerClasses}>
        <div className="">
          <div className="relative inline-flex items-center w-full">
            <button
              className={
                "text-white font-bold uppercase text-xl px-5 py-3 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 " +
                bgColor
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              <FontAwesomeIcon icon={buttonIcon} />
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mb-1"
              }
              style={{ minWidth: "12rem" }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
