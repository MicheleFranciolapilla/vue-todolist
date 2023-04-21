// Descrizione:
// Rifare l'esercizio della to do list.
// Questa volta però ogni todo sarà un oggetto, formato da due proprietà:
// - text, una stringa che indica il testo del todo
// - done, un booleano (true/false) che indica se il todo è stato fatto oppure no
// MILESTONE 1
// Stampare all'interno di una lista HTML un item per ogni todo.
// Se la proprietà done è uguale a true, visualizzare il testo del todo sbarrato.
// MILESTONE 2
// Visualizzare a fianco ad ogni item ha una "x": cliccando su di essa, il todo viene rimosso dalla lista.
// MILESTONE 3
// Predisporre un campo di input testuale e un pulsante "aggiungi": cliccando sul pulsante, il testo digitato viene letto e utilizzato per creare un nuovo todo, che quindi viene aggiunto alla lista dei todo esistenti.
// Bonus:
// 1- oltre al click sul pulsante, intercettare anche il tasto ENTER per aggiungere il todo alla lista
// 2- cliccando sul testo dell'item, invertire il valore della proprietà done del todo corrispondente (se done era uguale a false, impostare true e viceversa)

// Script Vue 3
const {createApp} = Vue 

createApp(
{
    data() 
    {
        return {
            // Costanti semantiche relative all'esito degli input
            // Input senza problemi
            outcome_ok:         0,
            // Input di stringa vuota
            outcome_empty:      1,
            // Input di testo troppo corto
            outcome_short:      2,
            // Input di soli spazi bianchi
            outcome_blanks:     3,
            // Input di elemento ripetuto
            outcome_exists:     4,

            // Variabile "di stato" dell'input avvenuto/in corso
            input_outcome:      null,

            // Variabile "di prossimità" agli headers della tabella, per i quali sia presente un riquadro informativo
            proximity:          0,

            // Array con messaggi da utilizzare nel caso di input errato: errors[0] + errors specifico
            errors:
                                [   "L'ultimo dato digitato non può essere inserito poichè ",
                                    "inesistente (stringa vuota)!",
                                    "troppo corto!",
                                    "composto da soli spazi!",
                                    "già presente!"
                                ],

            // Oggetto di acquisizione input
            new_item:           {
                                    text:       "",
                                    notable:    false,
                                    done:       false   
                                },
            // Variabile indicante la lunghezza minima degli input validi
            min_item_length:    5,

            // Array degli oggetti "to do"
            todos:              [
	                                {
		                                text:       'Fare i compiti',
                                        notable:    false,
		                                done:       false
	                                },
	                                {
		                                text:       'Fare la spesa',
                                        notable:    false,
		                                done:       true
	                                },
	                                {
		                                text:       'Fare il bucato',
                                        notable:    true,
		                                done:       false
	                                }
                                ]
        }
    },
    created()
    {
        // Inizializzazione della variabile di stato degli input
        this.reset_errors();
    },
    methods: 
    {
        // Inizializzazione della variabile di stato degli input 
        reset_errors()
        {
            this.input_outcome = this.outcome_ok;
        },

        // Rimozione oggetto dall'array, in conseguenza di click su apposita icona
        remove_item(index)
        {
            this.todos.splice(index,1);
        },

        // Metodo che verifica se il testo digitato sia composto da soli spazi
        just_blank_check(str_value)
        {
            let counter = 0;
            for (let i = 0; i < str_value.length; i++)
                if (str_value[i] === " ") counter++;
            return (counter == str_value.length);
        },

        // Metodo che verifica se l'input digitato sia una ripetizione di dato già presente
        exists(str_value)
        {
            let check = this.todos.filter((element) => (element.text.toUpperCase() == str_value.toUpperCase()));
            return (check.length != 0);
        },

        // Metodo di verifica di validità ed eventuale aggiunta del nuovo input
        add_item()
        {
            // Destrutturazione oggetto
            let {text, notable, done} = this.new_item;
            // Check su "stringa vuota"
            if (text === "")
            {
                this.input_outcome = this.outcome_empty;
            }
            // Check su "dato corto"
            else if (text.length < this.min_item_length)
            {
                this.input_outcome = this.outcome_short;
                text = "";
            }
            // Check su "soli spazi bianchi"
            else if (this.just_blank_check(text))
            {
                this.input_outcome = this.outcome_blanks;
                text = "";
            }
            // Check su "dato già presente"
            else if (this.exists(text))
            {
                this.input_outcome = this.outcome_exists;
                text = "";                
            }
            // Dato sicuramente valido
            else
            {
                this.input_outcome = this.outcome_ok;
                this.todos.push(this.new_item);
                text = "";
            }
            this.new_item = {text, notable, done};
        },

        // Metodo riconoscitore della pressione del tasto "enter"
        check_keypressed(event) 
        {
            if (event.key === "Enter")
            {
                this.add_item();
            }
        },

        // Metodo utilizzato per formattare lo stile del testo "to do", in funzione degli altri due campi booleani
        set_text_style(index)
        {
            let str_value = "";
            if (this.todos[index].notable) str_value += "color: yellowgreen; font-weight: 800; ";
            if (this.todos[index].done) str_value += "text-decoration: line-through;";
            return str_value;
        }
    }
}).mount('#vue_app')