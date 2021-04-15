//Pegando a Páginal atual; location é responsável por mostrar a localização que a gente está,e o path name vai falar qual caminho que eu estou
const currentPage = location.pathname
//Pegando os elementos do header da pág
const menuItems = document.querySelectorAll('body nav a')

for (item of menuItems){
    // EX: se estive na pag de url 3242352 o número 2 , o nome ficará destacado
    if (currentPage.includes(item.getAttribute("href"))) {
                            // item.getAttribute("href") = /captains ou /members


        item.classList.add("active")
    }
}


// ======= PAGINAÇÃO ===============//




















//=================Learning Includes Function==========================

// console.log("/captains/2".includes("captains"));
                // é com se fosse uma pergunta:
//  "essa tal frase" tem (inclui) "tal frase"? sim!

//            assim conseguirá seu true ou false

// o includes procura no arquivo todo pelo parametro passado, se tiver é true, senão false 