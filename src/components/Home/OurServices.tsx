const OurServices = () => {
  return (
    <div className="bg-red-200 p-5 mt-5 text-justify flex">
      <div className="mr-5">
        <h1 className="text-lg font-bold">Our Services</h1>
        <br />
        <span className="font-bold">Tractor Rental:</span> Need a powerful
        tractor for your hauling needs? Rent one of our high-performance
        tractors to get the job done efficiently.
        <br />
        <br />
        <span className="font-bold">Trailer Rental:</span> Whether it's a
        flatbed, refrigerated, or dry van trailer, we offer a wide selection of
        trailers to accommodate various cargo types.
        <br />
        <br />
        <span className="font-bold">Combo Rental:</span> Looking for a complete
        solution? Rent both a tractor and a trailer together for a seamless
        transportation experience.
      </div>{" "}
      <img
        src={`/fresh-car-rental/data/other-imgs/sun.jpeg`}
        alt="sun"
        className="trailerChooserPhoto"
      ></img>
    </div>
  );
};

export default OurServices;
