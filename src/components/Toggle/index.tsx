import {ToggleSwitch} from './styles';


export type ToggleProps = {
    Name: string;
}

export function Toggle(props: ToggleProps) {
    return(
        <ToggleSwitch>
            <input
            type="checkbox"
            className="toggle-switch-checkbox"
            name={props.Name}
            id={props.Name}
            />
             <label className="toggle-switch-label" htmlFor={props.Name}>
                <span className="toggle-switch-inner" />
                <span className="toggle-switch-switch" />
            </label>
        </ToggleSwitch>
    )
}