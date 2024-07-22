const generateRandomRef = () => {
  let random = Math.random();

  random = random * 100000000;

  random = Math.floor(random);

  if (random < 10000000) {
    random += 10000000;
  }

  return random;
};

export default generateRandomRef;
