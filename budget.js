
let money,time,
    startBTN=document.getElementById("start"),// кнопка начать расчёт
    budgetValue = document.getElementsByClassName('budget-value')[0], //строка доход
    daybudgetValue =document.getElementsByClassName('daybudget-value')[0], //бюджет на один день 
    levelValue = document.getElementsByClassName('level-value')[0], //Уровень дохода:
    expensesValue=document.getElementsByClassName('expenses-value')[0],//Обязательные расходы
    optionalexpensesValue=document.getElementsByClassName('optionalexpenses-value')[0],//Возможные траты
    incomeValue=document.getElementsByClassName('income-value')[0],//Дополнительный доход
    monthsavingsValue=document.getElementsByClassName('monthsavings-value')[0],//Накопления за 1 месяц
    yearsavingsValue=document.getElementsByClassName('yearsavings-value')[0],//Накопления за 1 год

    expensesItem = document.getElementsByClassName('expenses-item'),//обязательные расходы
	expensesBtn = document.getElementsByTagName('button')[0],//утвердить1
	optionalExpensesBtn = document.getElementsByTagName('button')[1],//утвердить2
    countBtn = document.getElementsByTagName('button')[2],//расчитать
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),//необязательные расходы
	incomeItem = document.querySelector('.choose-income'),//статьи возможного дохода через запятую
	checkSavings = document.querySelector('#savings'),//галочка
	sumValue = document.querySelector('.choose-sum'),//сумма
    percentValue = document.querySelector('.choose-percent'),//проценты
    yearValue = document.querySelector('.year-value'),//год
    monthValue = document.querySelector('.month-value'),//месяц
    dayValue = document.querySelector('.day-value');//год
var numchooseOptExpenses=1;


//alert("Для начала работы нажмите на кнопку *Начать расчет* внизу страницы");

startBTN.addEventListener('click', function()                          // при нажатии кнопки начать расчёт выплняется функия
{   time =prompt("Введите дату в формате YYYY-MM-DD","YYYY-MM-DD"); //пользователь вводит дату
    money =+prompt("Ваш бюджет на месяц,",0);                       //пользователь вводит бюджет на месяц
            while(isNaN(money) || money == "" || money== null)
            {
            money =+prompt("Ваш бюджет на месяц,",0);
            }
    appData.budget=money;                                           //сохренние введённых пользователем данных (бюджет) в объект appData=>budget => месячній бюджет  
    appData.timeData=time;                                          //сохренние введённых пользователем данных (бюджет) в объект appData=> timeData => дата
    budgetValue.textContent=money.toFixed();                        // вывод на экран информации в строчке Доход
    yearValue.value=new Date (Date.parse(time)).getFullYear();      //отделение от введённой пользователем даты в формате YYYY-MM-DD год
    monthValue.value=new Date (Date.parse(time)).getMonth()+1;      //отделение от введённой пользователем даты в формате YYYY-MM-DD месяц
    dayValue.value=new Date (Date.parse(time)).getDate();
    


    expensesBtn.addEventListener('click',function(){   // обязательные расходы
        let sum=0;
        for (let i=0;i<expensesItem.length;i++){
            let a = expensesItem[i].value,
            b = +expensesItem[++i].value;
            console.log(b);

                if ((typeof(a))!=null&&
                    (typeof(b))!=null&&
                    a!=""&&
                    b!=""&&
                    a.length<50){
                        console.log("ok");
                        appData.expenses[a]=b;
                        sum=sum+b;
                        console.log(sum);
                        
                    }
                else{
                   alert('заполните все поля');
                    console.log(sum);
                    i=i-1;
                }
                
                
        expensesValue.textContent=sum; // записываем в ячейку expensesValue сумму расходов
        appData.sunRash=sum;
        console.log(appData.sunRash);
                
        }

      
    });



    optionalExpensesBtn.addEventListener('click',function(){ // функция необязательные расходы
        for (let i=0;i<optionalExpensesItem.length;i++){               // перебор элементов с тегом optionalExpensesItem
          //  optionalExpensesItem.background.color='red';
            let opt =optionalExpensesItem[i].value;                     //в переменную opt присваиваем каждое значение введёное пользователем в ячейку с тегом optionalExpensesItem
            appData.optionalExpenses[i]=opt;                            // записываем в рамках цикла в глобальный объект appData 
            optionalexpensesValue.textContent+=appData.optionalExpenses[i]+'; '; // записываем информацию в ячейку с тегом optionalexpensesValue ве что есть в глобальном объекте

        }  
        
    });

    countBtn.addEventListener('click', function(){          //функция расчёта ежедневного расхода
       

    if (appData.budget!=undefined){


        
        appData.moneyPerDay = ((appData.budget-appData.sunRash)/30).toFixed(2); // внесение в глобальные объект       toFixed(2)-округлеие до двух после запятой
        //alert ("Бюджет на 1 день составляет " + appData.moneyPerDay + " грн."); 



        daybudgetValue.textContent=appData.moneyPerDay;         // вывод в ячейке информации


        if (appData.moneyPerDay < 100) { 
            levelValue.textContent="Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent="Это средний уровень достатка!";
        } else if(appData.moneyPerDay > 2000) {
            levelValue.textContent="Это высокий уровень достатка!";
        } else {
            levelValue.textContent="Произошла ошибка";
        }


    }
    else{daybudgetValue.textContent='error';
    alert("Для начала работы нажмите на кнопку *Начать расчет* внизу страницы");
    }

    });


incomeItem.addEventListener('input', function(){

    let items = incomeItem.value;
    console.log(items);
    appData.income = items.split(", ");
    console.log(appData);
    incomeValue.textContent=appData.income;


});

      
checkSavings.addEventListener('click', function(){

if (appData.savings==true){
    appData.savings=false
}
else{
    appData.savings=true;
}
console.log(appData.savings);
});


sumValue.addEventListener('input', function(){

    if (appData.savings==true){
        let sum=+sumValue.value,
        percent=+percentValue.value;
        appData.monthIncome=(sum/100/12*percent).toFixed(1);

        console.log(appData.monthIncome);
        appData.yearIncome=(sum/100*percent).toFixed(1);
        console.log(appData.yearIncome);

        monthsavingsValue.textContent=appData.monthIncome;
        yearsavingsValue.textContent=appData.yearIncome;

    }  

});

percentValue.addEventListener('input', function(){
    
    if (appData.savings==true){
    let sum=+sumValue.value,
        percent=+percentValue.value;
        appData.monthIncome=(sum/100/12*percent).toFixed(1);

        console.log(appData.monthIncome);
        appData.yearIncome=(sum/100*percent).toFixed(1);
        console.log(appData.yearIncome);

        monthsavingsValue.textContent=appData.monthIncome;
        yearsavingsValue.textContent=appData.yearIncome;}
})




})


let appData ={                              //объект
    budget:money,                           // месячный бюджет вводит пользователь
    timeData: 0,
    expenses: {},
    optionalExpenses:{},
    income:0,
    savings:false,                          // при false не выполнится функция с накоплениями


};                                  // окончание объекта



    





function vivod(){
alert("Способы доп. заработка: ")
appData.income.forEach(function(item, i, arr) {
    alert( (i+1) + ": " + item);
  });

}
//vivod();


//console.log( "Наша программа включает в себя данные: ");
/*for (let key in appData){
    console.log (key+appData[key]);
}*/
