package br.com.fiap.model.vo;

import jakarta.persistence.*;

@Entity
@Table(name = "dadosClimaticos")
public class DadosClimaticos {
    @Id
    private Long id;

    @Column(name = "temperatura")
    private int temperatura;

    @Column(name = "umidade")
    private int umidade;

    @Column(name = "velocidadeVento")
    private int velocidadeVento;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(int temperatura) {
        this.temperatura = temperatura;
    }

    public int getUmidade() {
        return umidade;
    }

    public void setUmidade(int umidade) {
        this.umidade = umidade;
    }

    public int getVelocidadeVento() {
        return velocidadeVento;
    }

    public void setVelocidadeVento(int velocidadeVento) {
        this.velocidadeVento = velocidadeVento;
    }
}
