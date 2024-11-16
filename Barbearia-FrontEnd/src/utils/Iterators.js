export class FuncionarioIterator {
    constructor(funcionarios) {
      this.funcionarios = funcionarios;
      this.index = 0;
    }

    next() {
      if (this.hasNext()) {
        return this.funcionarios[this.index++];
      }
      return null;
    }

    hasNext() {
      return this.index < this.funcionarios.length;
    }
  }

  export class TipoDeCorteIterator {
    constructor(tipoDeCortes) {
      this.tipoDeCortes = tipoDeCortes;
      this.index = 0;
    }

    next() {
      if (this.hasNext()) {
        return this.tipoDeCortes[this.index++];
      }
      return null;
    }

    hasNext() {
      return this.index < this.tipoDeCortes.length;
    }
  }

  export class HorarioIterator {
    constructor(horarios) {
      this.horarios = horarios;
      this.index = 0;
    }

    next() {
      if (this.hasNext()) {
        return this.horarios[this.index++];
      }
      return null;
    }

    hasNext() {
      return this.index < this.horarios.length;
    }
  }