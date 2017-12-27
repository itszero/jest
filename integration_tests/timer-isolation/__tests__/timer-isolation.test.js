describe('timer isolation', () => {
  const callback = jest.fn();
  let next;
  const order = new Promise(resolve => {
    next = resolve;
  });

  test('setInterval', () => {
    setInterval(callback, 500);
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
    next();
  });

  test('isolated test', () => {
    return order.then(() => {
      jest.advanceTimersByTime(500);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
