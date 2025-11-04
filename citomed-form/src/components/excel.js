import ExcelJS from "exceljs";

export const exportExcel = (person, users) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 30;

    const excelColumns = () => {
        let arr = []
        const returnKeys = (key) => {
            if (key == 'first_name') return 'Имя'
            if (key == 'last_name') return 'Фамилия'
            if (key == 'patronymic') return 'Отчество'
            if (key == 'tel_number') return 'Телефон'
            if (key == 'email') return 'Электронная почта'
            if (key == 'company') return 'Компания'
            if (key == 'company_city') return 'Город'
            if (key == 'company_activity') return 'Деятельность компании'
            if (key == 'position') return 'Должность'
            if (key == 'web_site') return 'Сайт'
            if (key == 'interest') return 'В каких продуктах заинтепресован'
            if (key == 'additional_information') return 'Иная информация'
        }
        for (let key in person) {
            arr.push({
                header: returnKeys(key),
                key: key,
                width: 20,
            })
        }
        arr.push({
            header: "Откуда данные",
            key: 'isbot',
            width: 20,
        })
        return arr
    }

    sheet.columns = excelColumns()

    console.log(users)

    users.map(user => {
        return sheet.addRow({
            first_name: user.first_name,
            last_name: user.last_name,
            patronymic: user.patronymic,
            tel_number: user.tel_number,
            email: user.email,
            company: user.company,
            company_city: user.company_city,
            company_activity: user.company_activity,
            position: user.position,
            web_site: user.web_site,
            interest: user.interest,
            additional_information: user.additional_information,
            isbot: user.isbot ? 'телеграм' : 'форма'
        })
    })

    // далее просто методами библиотеки физически создаем excel файл
    workbook.xlsx.writeBuffer().then((state) => {
        const blob = new Blob([state], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `${1}.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
    });
};