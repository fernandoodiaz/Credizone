const tiposInteres = ['TNA','TEA','TEM'];
function from_TNA_to_TEA(valorTasa) {
    // Convierte Tasa Nominal Anual (TNA) a Tasa Efectiva Anual (TEA).
    return (1 + valorTasa / 360) ** 360 - 1;
}

function from_TEA_to_TEM(valorTasa) {
    // Convierte Tasa Efectiva Anual (TEA) a Tasa Efectiva Mensual (TEM).
    return (1 + valorTasa) ** (1 / 12) - 1;
}

function cambia_tasa(valorTasa, tipoTasa) {
    // Convierte la tasa al tipo requerido para los cálculos.
    if (tipoTasa === "TEA") {
        return from_TEA_to_TEM(valorTasa);
    } else if (tipoTasa === "TNA") {
        valorTasa = from_TNA_to_TEA(valorTasa);
        return from_TEA_to_TEM(valorTasa);
    }
    return valorTasa;
}

function calcula_cuota(valorTasa, tipoTasa, montoInicial, tiempo, tGracias) {
    // Calcula el monto de la cuota mensual.
    valorTasa = cambia_tasa(valorTasa, tipoTasa);
    tiempo -= tGracias;
    let cuota = montoInicial * valorTasa * (1 + valorTasa) ** tiempo / ((1 + valorTasa) ** tiempo - 1);
    return cuota;
}

function total_intereses_acumulado(valorTasa, tipoTasa, montoInicial, tiempo, nCuota, tGracias) {
    // Calcula el total de intereses acumulados durante el préstamo.
    valorTasa = cambia_tasa(valorTasa, tipoTasa);
    let cuota = calcula_cuota(valorTasa, tipoTasa, montoInicial, tiempo, tGracias);
    let saldoInicial = montoInicial;
    let interesTotal = 0;
    for (let i = 0; i < nCuota; i++) {
        let interes = saldoInicial * valorTasa;
        saldoInicial -= (cuota - interes);
        interesTotal += interes;
    }
    return interesTotal;
}

function total_gracia(montoInicial, valorTasa, tGracias) {
    // Calcula el monto inicial después del período de gracia aplicando solo intereses.
    for (let i = 0; i < tGracias; i++) {
        montoInicial += montoInicial * valorTasa;
    }
    return montoInicial;
}

function boton_pago(cantidadPago, valorTasa, tipoTasa, montoInicial, tiempo, tGracias, nCuota) {
    // Incrementa la cantidad de pagos realizados.
    cantidadPago += 1;
    return cantidadPago;
}

function pago_fcontado(valorTasa, tipoTasa, montoInicial, tiempo) {
    // Calcula el monto final pagando al contado después de cierto tiempo con interés compuesto.
    valorTasa = cambia_tasa(valorTasa, tipoTasa);
    let tiempoAux = tiempo * 360; // Si tiempo es en años y necesitamos días
    return montoInicial * (1 + valorTasa) ** (tiempoAux / 360);
}

function calcula_saldo_final(valorTasa, tipoTasa, montoInicial, tiempo, tGracias, cantidadPago) {
    // Calcula el saldo final después de una serie de pagos.
    valorTasa = cambia_tasa(valorTasa, tipoTasa);
    let cuota = calcula_cuota(valorTasa, tipoTasa, montoInicial, tiempo, tGracias);
    if (tGracias > 0) {
        montoInicial = total_gracia(montoInicial, valorTasa, tGracias);
        tiempo -= tGracias;
    }
    let saldoInicial = montoInicial;
    for (let i = 0; i < cantidadPago; i++) {
        let interes = saldoInicial * valorTasa;
        saldoInicial -= (cuota - interes);
    }
    return saldoInicial;
}

export {calcula_cuota, total_intereses_acumulado, tiposInteres}