// Reservas

console.log("He creado una clase padre, dos hijos y ambas tienen el extra del desayuno calculado");
console.log('====================');

const reservas = [{
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 3
    },
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 4
    },
    {
        tipoHabitacion: "suite",
        desayuno: true,
        pax: 2,
        noches: 1
    }
];

class ReservasHotel {

    constructor() {
        this._reservas = [];
        this._subtotal = 0;
        this.habIVA = 1.21;
        this.extraPricePerPax = 40;
        this.breakfastPrice = 15;
    }

    calculateExtraPricePerPax = (pax) => (pax - 1) * this.extraPricePerPax;

    calculateBreakfastPrice(desayuno, pax, noches) {
        if(desayuno == true) {
           return  pax * noches * this.breakfastPrice
        }else {
           return 0;
        }
    }

    get total() {
        return this._total;
    }

    get subtotal() {
        return this._subtotal;
    }

    set reservas(listaReservas) {
        this._reservas = listaReservas;
        this.calculaSubtotal();
        this.calculaTotal();
    }


} // Fin de la clase padre Reservas Hotel

console.log("==== Caso 1: Cliente normal ====");


class ReservasClienteNormal extends ReservasHotel {

    constructor() {
        super();
    }

    calcularPrecioHabitacion(tipoHabitacion) {
        switch (tipoHabitacion) {
            case 'standard':
                return 100;
            case "suite":
                return 150;
        }
        return 100;
    }

    calculaSubtotal() {
        this._subtotal = reservas.reduce((acumulado, {
            pax,
            noches,
            tipoHabitacion,
            desayuno
        }) => acumulado + ( noches * this.calcularPrecioHabitacion(tipoHabitacion) ) + this.calculateExtraPricePerPax(pax) + this.calculateBreakfastPrice(desayuno, pax,noches), 0);
    }



    calculaTotal() {
        this._total = reservas.reduce((acumulado, {
            pax,
            noches,
            tipoHabitacion,
            desayuno
        }) => acumulado + ( ( noches * this.calcularPrecioHabitacion(tipoHabitacion)) + this.calculateExtraPricePerPax(pax) + this.calculateBreakfastPrice(desayuno, pax,noches) ) * this.habIVA, 0);
    }

}  // Fin de la clase hijo ReservasClienteNormal

const cuantiaReservasClienteNormal = new ReservasClienteNormal();

cuantiaReservasClienteNormal.reservas = reservas; // Al usar el setter no hay que volver a llamar a las funciones, automaticamente lo hace cuando se actualiz ala cesta
console.log("subtotal", cuantiaReservasClienteNormal.subtotal);
console.log("total", cuantiaReservasClienteNormal.total);


console.log("==== Caso 2: Tour Operador ====");

class ReservasTourOperador extends ReservasHotel {

    constructor() {
        super();
        this.precioHabTourOperador = 100;
        this.descTourOperador = 0.75;
    }

    calculaSubtotal() {
        this._subtotal = reservas.reduce((acumulado, {
            pax,
            noches,
            desayuno
        }) => acumulado + ( (noches * this.precioHabTourOperador) + this.calculateExtraPricePerPax(pax) + this.calculateBreakfastPrice(desayuno, pax,noches) ) * this.descTourOperador, 0);
    }


    calculaTotal() {
        this._total = reservas.reduce((acumulado, {
            pax,
            noches,         
            desayuno
        }) => acumulado + ( ( (noches * this.precioHabTourOperador) + this.calculateExtraPricePerPax(pax) + this.calculateBreakfastPrice(desayuno,pax,noches) ) * this.descTourOperador) * this.habIVA, 0);
    }
} // Fin de la clase hijo ReservasTourOperador

const cuantiaReservasTourOperador = new ReservasTourOperador();

cuantiaReservasTourOperador.reservas = reservas;
console.log("subtotal", cuantiaReservasTourOperador.subtotal);
console.log("total", cuantiaReservasTourOperador.total);


