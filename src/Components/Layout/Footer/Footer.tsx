import { Footer as FbFooter } from "flowbite-react";

const Footer = () => {
  return (
    <FbFooter container className=" bg-slate-300 text-center text-black dark:bg-gray-700">
      <div className="flex w-full justify-center">
        <FbFooter.Copyright
          href="#"
          by="Firas Qaissi"
          year={2024}
          className="text-slate-700-bold dark:text-slate-300"
        />
      </div>
    </FbFooter>
  );
};

export default Footer;
