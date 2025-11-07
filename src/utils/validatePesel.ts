export const validatePesel = (pesel: string) => {
    //dlugość pesel 11 cyfr
    if (!/^\d{11}$/.test(pesel))
      return { valid: false, error: 'PESEL musi mieć 11 cyfr' }

    //sprawdzenie miesiaca z oficjalną dokumentacją gov pesel
    let yearBase
    const yy = parseInt(pesel.slice(0, 2))
    let mm = parseInt(pesel.slice(2, 4))
    const dd = parseInt(pesel.slice(4, 6))

    if (mm >= 1 && mm <= 12) {
      yearBase = 1900
    } else if (mm >= 21 && mm <= 32) {
      yearBase = 2000
      mm -= 20
    } else if (mm >= 81 && mm <= 92) {
      yearBase = 1800
      mm -= 80
    } else {
      return { valid: false, error: 'Niepoprawny kod miesiąca w PESEL' }
    }

    //poprawność daty urodzenia
    const year = yearBase + yy
    const birthDate = new Date(year, mm - 1, dd)
    if (
      birthDate.getFullYear() !== year ||
      birthDate.getMonth() !== mm - 1 ||
      birthDate.getDate() !== dd
    ) {
      return { valid: false, error: 'Niepoprawna data urodzenia' }
    }

    //suma kontrolna
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
    const digits = pesel.split('').map((digit) => parseInt(digit))
    const controlSum = weights.reduce(
      (acc, current, i) => acc + current * digits[i],
      0
    )
    const check = (10 - (controlSum % 10)) % 10
    if (check !== digits[10])
      return { valid: false, error: 'Zła suma kontrolna PESELU' }

    return { valid: true, error: '' }
  }