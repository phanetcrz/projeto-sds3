package com.devsuperior.dsvendas.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.dsvendas.dto.SaleSuccessDTO;
import com.devsuperior.dsvendas.dto.SaleSumDTO;
import com.devsuperior.dsvendas.entities.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {
                                                             // obj é um apelido dado para cada objeto "Sale" do banco, que será agrupa do mesmo vendedor e o nome "seller tem que fica igual ao da classe Saller "private Seller seller"	
	@Query("SELECT new com.devsuperior.dsvendas.dto.SaleSumDTO(obj.seller, SUM(obj.amount)) "
			+ " FROM Sale AS obj GROUP BY obj.seller") //Sale - nome igual ao da classe	
	List<SaleSumDTO> amountGroupedBySeller();
	//--retorno           //--Nome da função
	
	
	@Query("SELECT new com.devsuperior.dsvendas.dto.SaleSuccessDTO(obj.seller, SUM(obj.visited), SUM(obj.deals)) "
			+ " FROM Sale AS obj GROUP BY obj.seller") 	
	List<SaleSuccessDTO> successGroupedBySeller();

	
}

 