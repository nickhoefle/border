import Switch from 'react-switch';

const OsmSwitch = ({ switchOn, toggleSwitch }) => {

    return (
        <div id="switchWrapper">
            <p id="switchText">OpenStreetMap Layer:</p>
            <Switch
                onChange={toggleSwitch}
                checked={switchOn}
                height={24}
                className='switch'
            />
        </div>
    );
};

export default OsmSwitch;