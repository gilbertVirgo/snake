import React from "react";
import "../scss/form.scss";

const Form = ({onSubmit, children}) => {
    const handleSubmit = event => {
        event.preventDefault();

        if(event.target.checkValidity) onSubmit();
    }

    return (<form onSubmit={event => handleSubmit(event)}>
        {children}
    </form>)
}

Form.Group = ({children}) => <section className="form group">{children}</section>
Form.Label = ({children}) => <label className="form label">{children}</label>
Form.Input = ({required, type, value, placeholder, onChange}) => <input required={required} type={type} value={value} placeholder={placeholder} onChange={onChange}/>

export default Form;