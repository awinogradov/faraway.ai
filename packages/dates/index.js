const dayjs = require('dayjs');

const humanDateFormat = 'DD.MM.YYYY HH:mm';
const compareDateFormat = 'DD.MM.YYYY';
const today = new Date();

const todayManipulator = dayjs(today);
const endOfMonthManipulator = todayManipulator.endOf('month').hour(0).minute(0);
const endOfYearManipulator = todayManipulator.endOf('year').hour(0).minute(0);

const separateWeekends = (days, num) => {
    let saver = [];
    return days.reduce((acc, curr) => {
        saver.push(curr);
        if (saver.length === num) {
            acc.push(saver);
            saver = [];
        }
        return acc;
    }, []);
};

const calcWeekends = (from, to) => {
    const flexWeekendsDays = [];
    const strictWeendsDays = [];

    let fromDayManipulator = from;
    let toDayManipulator = to;

    switch (toDayManipulator.day()) {
        case 5:
            console.log('Period ands at Fr');
            toDayManipulator = toDayManipulator.add(2, 'days');
            break;
        case 6:
            console.log('Period ands at Sat');
            toDayManipulator = toDayManipulator.add(1, 'days');
            break;
    
        default:
            console.log(`${toDayManipulator.format(humanDateFormat)} is not flexible`);
            break;
    }

    let todayIterator = fromDayManipulator;

    while (todayIterator.format(compareDateFormat) !== toDayManipulator.format(compareDateFormat)) {
        const currentDay = todayIterator.day();

        if (currentDay === 5 || currentDay === 6 || currentDay === 0) {
            flexWeekendsDays.push(todayIterator.format(humanDateFormat));
        }

        if (currentDay === 6 || currentDay === 0) {
            strictWeendsDays.push(todayIterator.format(humanDateFormat));
        }

        todayIterator = todayIterator.add(1, 'day').hour(0).minute(0);
    }

    const separatedFlexWeekends = separateWeekends(flexWeekendsDays, 3);
    const separatedStrictWeekends = separateWeekends(strictWeendsDays, 2);


    console.log(from.format(humanDateFormat));
    console.log(to.format(humanDateFormat));

    console.log(separatedFlexWeekends);
    console.log(separatedStrictWeekends);
}

calcWeekends(todayManipulator, endOfMonthManipulator);
console.log('######################################');
calcWeekends(todayManipulator, endOfYearManipulator);
