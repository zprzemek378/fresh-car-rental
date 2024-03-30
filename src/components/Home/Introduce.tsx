const Introduce = () => {
  return (
    <div className="bg-red-200 p-5 text-justify flex">
      <div className="mr-5">
        <span className="font-bold text-lg">
          Welcome to Our Rental Services!
        </span>
        <br />
        <br />
        Looking for reliable trailer rental solutions? Look no further! At
        <span className=" font-bold"> Fresh Truck Rental</span>, we specialize
        in providing top-notch tractor (semi-truck) and trailer rental services
        tailored to your transportation needs. So, what do you need today?
      </div>
      <img
        src={`/fresh-car-rental/data/other-imgs/highway.jpeg`}
        alt="highway"
        className="trailerChooserPhoto"
      ></img>
    </div>
  );
};

export default Introduce;
