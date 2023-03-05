// driverAge - driverAge of driver
// licenceHolding - number of full years person holds driving licenceHolding
// carClass - class of the car from 1 (smallest) to 5 (largest) that person wishes to rent
// violationAmount - has s/he caused any violationAmountidents within last year
// innocentviolationAmount - has s/he participated (but not caused) in any violationAmountidents within last year
// season - if it is high season or not
function price(driverAge, licenceHolding, carClass, violationAmount, innocentviolationAmount, season) {

  if (driverAge < 18) {
    throw new Error("Driver too young - cannot quote the price");
  }
  if (driverAge <= 21 && carClass > 1) {
      throw new Error("Drivers 21 y/o or less can only rent Class 1 vehicles");
  }

  let rentalprice = driverAge;
  if (carClass >= 4 && driverAge <= 25 && season) {
    rentalprice *= 1.5;
  }
  if (licenceHolding < 1) {
      throw new Error("Driver must hold driving licenceHolding at least for one year. Can not rent a car!");
  }
  if (licenceHolding < 3) {
    rentalprice *= 1.3;
  }
  if (violationAmount && driverAge < 30) {
    rentalprice += 15;
  }
  if (rentalprice > 1000) {
    return 1000;
  }
  return rentalprice;
}

exports.price = price;