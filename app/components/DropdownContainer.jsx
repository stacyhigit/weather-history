export default function DropdownContainer({
  show,
  setShow,
  background,
  children,
}) {
  return show ? (
    <>
      <div
        className={`fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full ${background} overflow-auto`}
        onClick={() => setShow(false)}
      ></div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </>
  ) : null;
}
