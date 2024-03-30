const WhyUs = () => {
  return (
    <div className="bg-gray-200 p-5 mt-5 text-justify flex">
      <img
        src={`/fresh-car-rental/data/other-imgs/warehouse.jpeg`}
        alt="warehouse"
        className="trailerChooserPhoto"
      ></img>
      <div className="ml-5">
        <h1 className="text-lg font-bold">Why Choose Us?</h1>
        <br />
        <span className="font-bold">Versatile Rental Options:</span> Whether
        you're in need of just a tractor, a trailer, or both, we've got you
        covered. Our flexible rental options allow you to choose the equipment
        that suits your requirements best.
        <br /> <br />
        <span className="font-bold">Quality Assurance:</span> We maintain a
        fleet of well-maintained and modern equipment to ensure maximum
        reliability and efficiency for your transportation tasks.
        <br /> <br />
        <span className="font-bold">Convenient Locations:</span> With
        headquarters located in multiple cities across Poland and Germany,
        accessing our rental services is convenient and hassle-free.
        <br /> <br />
        <span className="font-bold">Professional Support:</span> Our team of
        experienced professionals is dedicated to providing exceptional customer
        service and support throughout your rental experience.
      </div>
    </div>
  );
};

export default WhyUs;
