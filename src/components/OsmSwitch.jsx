import Switch from 'react-switch';

const OsmSwitch = ({ switchOn, toggleSwitch }) => {

    return (
        <div id="switchAndTextWrapper">
            <p id="switchText">OpenStreetMap Layer</p>
            <div id="switchWrapper">
                <Switch
                    onChange={toggleSwitch}
                    checked={switchOn}
                    height={24}
                    className='switch'
                />
            </div>
        </div>
    );
};

export default OsmSwitch;