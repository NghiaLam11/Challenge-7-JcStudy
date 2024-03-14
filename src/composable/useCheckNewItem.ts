export const useCheckNewItem = (item: any) => {
  function datediff(first: any, second: any) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
  function parseDate(str: any) {
    var mdy = str.split("/");
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
  }

  const date = new Date();
  const countDaysBetweenTwoDays = datediff(
    parseDate(item?.createdAt),
    parseDate(date.toLocaleDateString("en-US"))
  );
  if (countDaysBetweenTwoDays < 7) {
    return item;
  }
};
