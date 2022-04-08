/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */


/* eslint-disable no-extend-native */
export const isEmpty = ( obj: {} ) => {

    // eslint-disable-next-line no-restricted-syntax
    for ( const key in obj ) {

        if ( Object.prototype.hasOwnProperty.call( obj, key ) ) {

            return false;

        }

    }
    return true;

};


export const minuteToMiliseconds = ( minute: number ) => minute * 60 * 1000;
