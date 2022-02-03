
<!--	<br><br>
	<p>
	<table width=500 align=center cellspacing=0 cellpadding=0 border=0>
	    <tr>
			<td class=CorbgLaranja> 
				<table Style="FONT-FAMILY: Helvetica, Arial, Verdana, sans-serif" width=100% cellpadding=1 cellspacing=1 border=0>
					<tr class=CorbgLaranja10>
						<td valign=middle align=center>
							<br><font color=#e56c15 size=3><b>ATENÇÃO</b></font>
							<br><font size=2><b>pStr</b></font><br><br>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	</p>
	<br><br>
-->

	<!-- <table width=90% align=center cellspacing=0 cellpadding=0 border=0>
		<tr>
			<td><hr	class=CorLaranja width=100% border=1></td>
		</tr>
		<tr>
			<td align=center valign=bottom class=car11>
				Copyright ©&nbsp;<A class=lnk1 href="http://10.33.1.152/intranet2/index.asp">
				Synapsis - Soluções e Serviços IT.</A><br>All rights reserved.
			</td>
		</tr>
	</table>  -->

	<!-- <table width=90% cellSpacing=0 cellPadding=0 border=0>				
		<tr><td><img src="Imagens/trans.gif" width=1 height=2 border=0></td></tr>
	</table>
	<table width=90% align=center cellspacing=0 cellpadding=0 border=0>
		<tr>
			<td><img src="Imagens/logo_coelce1.gif" border=0></td>
			<td align=right valign=bottom class=car12><b>Session("Nome")</b></td>
		</tr>
		<tr>
			<td colspan=2><hr class=CorLaranja width=100% border=1></td>
		</tr>
		<tr>
			<td align=right valign=top colspan=2>
				<a class="lnk1 car12" href="gPaginaInicial"><b>Sair do Programa</b></a>
			</td>
		</tr>
	</table> -->

	<!-- <table width=90% cellSpacing=0 cellPadding=0 border=0>				
		<tr><td class=corbgCinza><img src="Imagens/trans.gif" width=1 height=1 border=0></td></tr>
	</table>
	<table class=car12 width=90% cellSpacing=2 cellPadding=2 border=0>				
		<tr><td><b><a class="car12 lnk1" title="Realizar Teste Enviados" href="ATRealizarTeste.asp">Realizar Teste</a></b></td></tr>
		<tr><td><b><a class="car12 lnk1" title="Testar Meus Conhecimentos nos Testes Simulados" href="ATMenuAluno.asp">Testes Simulados</a></b></td></tr>
		<tr><td><b><a class="car12 lnk1" title="Teste Cadastrados no Sistema" href="ATTesteMateiraMaterialDidatico.asp">Testes Registrados</a></b></td></tr>
		<tr><td><b><a class="car12 lnk1" title="Material Didático das Matérias" href="ATMaterialDidaticoMateria.asp">Materiais Didátigos</a></b></td></tr>
		<tr><td><b><a class="car12 lnk1" title="Resultados de Todos os Meus Testes" href="ATListaResultadoTeste.asp">Resultados dos Testes</a></b></td></tr>
	</table>
	<table width=90% cellSpacing=0 cellPadding=0 border=0>				
		<tr><td class=corbgCinza><img src="Imagens/trans.gif" width=1 height=1 border=0></td></tr>
	</table> -->


<html>
<head>
	<title>Matrícula</title>
	<!--<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
	<meta http-equiv="pragma" content="no-cache" />-->
	<meta name="developer" content="franze.azevedo@uece.br">

	<style type="text/css">
		<!--
		body {
		margin: 0;
		background-color:#FFFFFF;
		text-align:center;
		}

		.pretoMedio {
			font-family: Verdana, Arial, Helvetica, sans-serif;
			font-size: 11px;
			color: #333333;
		}
		
		.pretoPequeno {
			font-family: Verdana, Arial, Helvetica, sans-serif;
			font-size: 11px;
			color: #666666;
		}
		
		/*
		.caixa {
			margin: 0 auto;
			text-align:left;
			width: 500px; 
			border:solid 1px #C5C5C5;
			padding:3px;
			background:#F7F7F7;
			font-family:Verdana, Arial, Helvetica, sans-serif;
			font-size:11px;
			color:#333333;
		}
		*/
		
		.subTitulo{
			padding:10px;
		}
		

		.campos{
			padding:10px;
		}

		
		/*	
		.campos label {
			width: 100px;
			display:table;
			float:left;
			font-weight:bold;
		}
		*/
		
		
		.caixaDeTexto {
			width:150px;
			border:solid 1px #999999;
			font-family:Verdana, Arial, Helvetica, sans-serif;
			font-size:11px;
		}
		
		.botao {
			font-family:verdana, arial, helvetica, sans-serif;
			font-size:12px;
			text-align:center;
			width:100px;
	        font-weight:bold;
		}		
		
		/*
		.botao {
			background:url('images/resultadoBt.gif');
			height:20px;
			width:75px;
			font-family:Verdana, Arial, Helvetica, sans-serif;
			color:#FFFFFF;
			font-weight:bold;
			font-size:11px;
			border:1px solid #FFFFFF;
		}
		*/
		
		.botoes {
			padding:10px;
			text-align:right;
		}

		.caixa {
		    background: none repeat scroll 0 0 #F7F7F7;
		    border: 1px solid #C5C5C5;
		    color: #333333;
		    font-family: Verdana,Arial,Helvetica,sans-serif;
		    font-size: 11px;
		    margin: 0 auto;
		    padding: 3px;
		    text-align: left;
		    /* width: 718px;  */
		    width: 500px;
		}
	-->
	</style>

	<script language="javascript">
	
		function pagina() {
			window.location.href="foraperiodo.asp";
		}
		
		function right(e)
		{
		  if (navigator.appName == "Netscape" && (e.which == 2 || e.which == 3))
		  {
		    alert("Conteúdo protegido.");
		    return false;
		  }
		  else if (navigator.appName == 'Microsoft Internet Explorer' && (event.button == 2 || event.button == 3))
		  {
		    alert("Conteúdo protegido.");
		    return false;
		  }
		  return true;
		}

		document.onmousedown=right;
		document.onmouseup=right;
		if (document.layers)
		  window.captureEvents(Event.MOUSEDOWN);
		if (document.layers)
		  window.captureEvents(Event.MOUSEUP);
		window.onmousedown=right;
		window.onmouseup=right;

		function closewin() { window.close(); }

		function Confirma(){
			var matricula
			var numero
			var senha
			var soma
			var digito
			var digcalculado
			var resto
		    var wqt

		   	digcalculado=0
		   	matricula= document.Standard.txtMatricula.value
			senha = document.Standard.txtSenha.value
			numero=matricula.length
			wqt=7-numero
		    while (wqt>0)
		    {
		       matricula='0' + matricula
		       wqt=wqt-1
		    }
		    document.Standard.txtMatricula.value = matricula
			digito=parseInt(matricula.charAt(6))
			numero=matricula.length
			if ((numero != 7))
			{
				alert("A Matrícula deve ter 7 dígitos")
				return false
			}
			else if (matricula=="0000000")
			{
				alert("Matrícula Inválida")
				return false
			}
			else
			{
				soma=(parseInt(matricula.charAt(0))*2)+(parseInt(matricula.charAt(1))*3)+(parseInt(matricula.charAt(2))*5)+(parseInt(matricula.charAt(3))*7)+(parseInt(matricula.charAt(4))*2)+(parseInt(matricula.charAt(5))*3)
				resto=soma%11
				if ((resto==0) || (resto==1))
				{
					digcalculado=0
				}
			 	else
			 	{
			 		digcalculado=11-resto
			 	}
			 	if ((digito != digcalculado))
				{
					alert("Matrícula Inválida ")
					return false
				}


			   /*if ((senha.length < 8))
				 {
				    alert("Digite a Senha!")
				    return false
				 }
				 else
				 {
				   return true
				 }
				*/

			return true

			}
		}
	</script>
</head>

<body bgcolor="#FFFFFF">

<div align="center">
	<center>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
	</center>
</div>

<form action="escolha.asp" method="post" id="standard" name="standard"  onsubmit="return Confirma(this.form)">

	<div class="caixa">
	<!--
	<div style="display: block; width: 350px; float: left; height: 239px; background-image: url(images/auto.jpg);"></div>
    -->
	
	<div style="display: block; float: right; width: 500px;">
		
		<div class="titulo"><img width="500" height="50" alt="resultado" src="images/login.gif"> </div>
		<!-- <div class="subTitulo"></div> -->
		
		<div class="campos">
		    <font class="pretoMedio">
		        <!-- .franze.
		        if Session("CDFASEMAT") = "1" then %>
					  <div align="center">PERÍODO DA PRIMEIRA FASE DE MATRÍCULA<br> Session("DT_INI_MATRICULA") a Session("DT_FIM_MATRICULA") </div>
		        else 
					  <div align="center">PERÍODO DA SEGUNDA FASE OU AJUSTE<br> Session("DT_INI_REAJUSTE") a Session("DT_FIM_REAJUSTE") </div>	        
		        end if 
		        -->
				<div align="center"><b><u>PERÍODO DE MATRÍCULA OU REAJUSTE</u></b></div>	        	        
		        <div style="text-align:justify"><br><b>INFORME SUA MATRÍCULA E SENHA DA MATRÍCULA PARA ACESSAR</b></div>
		        <div style="text-align:justify"><br><b>NESTA TELA VOÇÊ NÃO CONSEGUE REALIZAR MATRÍCULA OU REAJUSTE COM O E-MAIL E SENHA INSTITUCIONAL. <br><br>
		        SE QUISER REALIZAR A MATRÍCULA OU REAJUSTE UTILIZANDO SEU E-MAIL INSTITUCIONAL ENTRE PELO SISTEMA ALUNO-ONLINE.</b></div>
		    </font>
		</div>
		
		<div align="center" style="width: 400px;">
			<div class="campos">
				<table border=0>
					<tr>
					   <td class="pretoMedio"><b>MATRÍCULA:&nbsp;&nbsp;</b></td>
					   <td><input type="text" maxlength="7" size="7" class="caixaDeTexto" name="txtMatricula"></td>
					</tr>
					<tr style="height:10px;"><td></td></tr>
					<tr>
						<td class="pretoMedio"><b>SENHA DA MATRÍCULA:&nbsp;&nbsp;</b></td>
						<td><input type="password" maxlength="15" size="15" class="caixaDeTexto" name="txtSenha"></td>
					</tr>
				</table>
		        <input type="hidden"  value="1"     name="txtpc">
			    <input type="hidden"  value="login" name="acesso">
			</div>
		</div>
				
		<div><br></div>
		
		<div class="botoes" style="text-align:center">
		    <input type="button" value="Informações" class="botao" name="informacao" id="button3" onclick="pagina();">&nbsp;&nbsp;
		    <input type="submit" value="Entrar" class="botao" name="botao1" id="button1">&nbsp;&nbsp;	
		    <input type="button" value="Fechar" class="botao" name="botao2" id="button2" onclick="closewin();">
		</div>
		
	</div>
	
	<div style="clear: both;">
	</div>
	</div>

</form>

<script>
	document.standard.txtMatricula.focus();
</script>

</body>
</html>


