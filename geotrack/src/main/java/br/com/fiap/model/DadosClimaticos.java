package br.com.fiap.model;

public class DadosClimaticos {

        private int id;
        private double temperatura;
        private double umidade;
        private double velocidadeVento;

        public DadosClimaticos(int id, double temperatura, double umidade, double velocidadeVento) {
            this.id = id;
            this.temperatura = temperatura;
            this.umidade = umidade;
            this.velocidadeVento = velocidadeVento;
        }

        public int getId() {
            return id;
        }

        public double getTemperatura() {
            return temperatura;
        }

        public double getUmidade() {
            return umidade;
        }

        public double getVelocidadeVento() {
            return velocidadeVento;
        }

}

