import React, { useContext } from 'react';
import NoteContext  from '../context/notes/noteContext';

const About = () => {
    const a = useContext(NoteContext);
    // eslint-disable-next-line
    /* useEffect(() => {
        // eslint-disable-next-line
        a.update();
        // eslint-disable-next-line
    }, []) */
    return (
        <div>
            this is about {a.aboutUsDetails.name} and he studies in {a.aboutUsDetails.class}
        </div>
    )
}

export default About
