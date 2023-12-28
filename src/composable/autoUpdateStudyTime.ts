import { useUserStore } from "./useUser";
import { useUpdateUserStore } from "./useFirebaseStore";
export const autoUpdateStudyTime = () => {
  const userStore = useUserStore();
  const date = new Date();
  // const dataTest = ref([30, 40, 30, 70, 5]);

  let currentTime = 0;
  const timeArray: any = localStorage.getItem("currentTimeArray");
  const currentTimeArray =
    timeArray != null
      ? JSON.parse(timeArray)
      : {
          timeDay: date.getDate(),
          timeList: [],
        };
  // setTimeout(() => {
  //   const initialValue = 0;
  //   const sumTimeOfAllDay = currentTimeArray.value?.timeList.reduce(
  //     (accumulator: any, currentValue: any) => accumulator + currentValue,
  //     initialValue
  //   );
  //   userStore.studyTime.shift();
  //   userStore.studyTime.push(sumTimeOfAllDay);
  // }, 2000);

  const whenChangedDay = () => {
    if (date.getDate() != JSON.parse(timeArray).timeDay) {
      setTimeout(() => {
        const initialValue = 0;
        const timeArray: any = localStorage.getItem("currentTimeArray");
        console.log(JSON.parse(timeArray).timeList);
        const sumTimeOfAllDay = JSON.parse(timeArray).timeList.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          initialValue
        );
        console.log(sumTimeOfAllDay);
        console.log(userStore.studyTime);
        userStore.studyTime.shift();
        userStore.studyTime.push(sumTimeOfAllDay);
        const dataUpdateStudyTime = {
          studyTime: userStore.studyTime,
        };
        useUpdateUserStore(dataUpdateStudyTime);
      }, 2000);

      // RESET LOCAL STORE WHEN CHANGE THE DAY
      console.log(userStore.studyTime, "studyTime");
      localStorage.removeItem("currentTimeArray");
      localStorage.setItem(
        "currentTimeArray",
        JSON.stringify({
          timeDay: date.getDate(),
          timeList: [],
        })
      );
      currentTimeArray.value = {
        timeDay: date.getDate(),
        timeList: [],
      };
    }
  };
  whenChangedDay();

  setInterval(() => {
    currentTime += 1;
    console.log(timeArray);

    // localStorage.removeItem("currentTimeArray");
  }, 60000);

  window.addEventListener("beforeunload", (e: any) => {
    e.preventDefault();
    currentTimeArray.value.timeList.push(currentTime);
    localStorage.setItem(
      "currentTimeArray",
      JSON.stringify(currentTimeArray.value)
    );
    console.log(currentTimeArray.value, "currentTimeArray");
    currentTime = 0;
  });
};
