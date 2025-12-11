package com.muebleria.demo.config;

import java.math.BigDecimal;

public class ConfiguracionPreciosManager {
    
    private static ConfiguracionPreciosManager instance;
    private BigDecimal ivaPercentage;
    private BigDecimal descuentoMayorista;
    
    private ConfiguracionPreciosManager() {
        this.ivaPercentage = new BigDecimal("0.19");
        this.descuentoMayorista = new BigDecimal("0.10");
    }
    
    //instancia única
    public static synchronized ConfiguracionPreciosManager getInstance() {
        if (instance == null) {
            instance = new ConfiguracionPreciosManager();
        }
        return instance;
    }
    
    public BigDecimal getIvaPercentage() {
        return ivaPercentage;
    }
    
    public void setIvaPercentage(BigDecimal ivaPercentage) {
        this.ivaPercentage = ivaPercentage;
    }
    
    public BigDecimal getDescuentoMayorista() {
        return descuentoMayorista;
    }
    
    public void setDescuentoMayorista(BigDecimal descuentoMayorista) {
        this.descuentoMayorista = descuentoMayorista;
    }
}
