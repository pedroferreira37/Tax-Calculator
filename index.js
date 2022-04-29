const btn = document.querySelector("#calc");
const salaryInput = document.querySelector('input[name="salary"]');
const dependentsInput = document.querySelector('input[name="dependents"]');
const retireeInput = document.querySelectorAll('input[name="retiree"]');




function calculateSalaryFee(salary) {
  if(salary < 3000) {
    return {
      chargedFee: 'Isento'
    }
  } else if(salary >= 3000 && salary <= 7000) {
      return {
        chargedFee:  salary * (5 / 100),
        percent: 5
      }
    } else if(salary >= 7000 && salary <= 10000) {
      return {
        chargedFee:  salary * (10 / 100),
        percent: 10
      }
    } else  {
      return {
        chargedFee:  salary * (13 / 100),
        percent: 13
      }
    }
  }


function calculateTaxByDependents(dependents) {
  return (dependents * 200)
}

const isRetiree = {
  Yes(chargedFee, dependentsTax) {
      if(chargedFee === 'Isento') return 0
      
      const percentOfDiscount = (20 / 100)
      const totalFeeWithDiscount =  (chargedFee + dependentsTax) - ((chargedFee + dependentsTax) * (percentOfDiscount))
      return totalFeeWithDiscount  
  },
  No(chargedFee) {
    if(chargedFee === 'Isento') return 0

    return chargedFee
  }
}


function alertBox(salary,  dependents, retiree, percent, chargedFee, dependentsTax, totalFeeWithDiscount) {
  alert(`Salário: ${salary}\n
        Dependetes: ${dependents || 0}\n
        Aposentado: ${retiree === 'Yes' ? 'Sim' : 'Não'}\n
        Percentual de Imposto: ${percent || 0}%\n
        Valor: ${chargedFee}\n
        Desconto por dependente: ${dependentsTax}\n
        Total a pagar: ${totalFeeWithDiscount}`)
}



function handleClick() {
  const { value:salary} = salaryInput
  const { value:dependents} = dependentsInput
  let  retiree = ''
  
  retireeInput.forEach(element => {
    if(element.checked) {
      return retiree = element.value
    }
  })

  console.log(retiree)
  
 
  
  
  const { chargedFee, percent} = calculateSalaryFee(Number(salary))
  const dependentsTax = calculateTaxByDependents(dependents)

  const  totalFeeWithDiscount  = isRetiree[retiree](chargedFee,dependentsTax)
  
  alertBox(salary, dependents, retiree, percent, chargedFee, dependentsTax, totalFeeWithDiscount)
  

}

btn.addEventListener('click', handleClick)