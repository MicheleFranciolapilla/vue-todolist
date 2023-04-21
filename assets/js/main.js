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
            outcome_ok:         0,
            outcome_empty:      1,
            outcome_short:      2,
            outcome_blanks:     3,

            input_outcome:      null,

            errors:
                                [   "L'ultimo dato digitato non può essere inserito poichè ",
                                    "inesistente (stringa vuota)!",
                                    "troppo corto!",
                                    "composto da soli spazi!"
                                ],

            new_item:           {
                                    text:       "",
                                    notable:    false,
                                    done:       false   
                                },
            min_item_length:    5,
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
        this.reset_errors();
    },
    methods: 
    {
        reset_errors()
        {
            this.input_outcome = this.outcome_ok;
        },

        remove_item(index)
        {
            this.todos.splice(index,1);
        },

        just_blank_check(str_value)
        {
            let counter = 0;
            for (let i = 0; i < str_value.length; i++)
                if (str_value[i] === " ") counter++;
            return (counter == str_value.length);
        },

        add_item()
        {
            let {text, notable, done} = this.new_item;
            if (text === "")
            {
                this.input_outcome = this.outcome_empty;
            }
            else if (text.length < this.min_item_length)
            {
                this.input_outcome = this.outcome_short;
                text = "";
            }
            else if (this.just_blank_check(text))
            {
                this.input_outcome = this.outcome_blanks;
                text = "";
            }
            else
            {
                this.input_outcome = this.outcome_ok;
                this.todos.push(this.new_item);
                text = "";
            }
            this.new_item = {text, notable, done};
        },

        check_keypressed(event) 
        {
            if (event.key === "Enter")
            {
                this.add_item();
            }
        },

        set_text_style(index)
        {
            let str_value = "";
            if (this.todos[index].notable) str_value += "color: yellowgreen; font-weight: 800; ";
            if (this.todos[index].done) str_value += "text-decoration: line-through;";
            return str_value;
        }
    }
}).mount('#vue_app')