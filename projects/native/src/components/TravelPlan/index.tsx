import React from 'react';
import styled from 'styled-components/native';
import { Text, View, ScrollView, Image } from 'react-native';
import { format, toDate, addMonths, isSunday, isSaturday } from 'date-fns';
import Swiper from 'react-native-swiper';

import { Title } from '../Title';

import {
  TravelPlanData,
  CardFlighData,
  CardAccomodationData,
  CardPointData,
  CardInstaPointData,
} from './TravelPlan.typings';

const travelData: TravelPlanData = require('./TravelPlan.stub');
const collectionData: TravelPlanData['cards'] = require('./TravelPlan.stub/collection');

// 76px Title
// 120px Collections
const TravelPlanPresenter = styled.View`
  padding-top: 226px;
`;

const CollectionPresenter = styled.View``;
const CollectionCarousel = styled.ScrollView``;

const Day = styled.View`
  margin-bottom: 20px;

  position: relative;

  border-color: #fcfcfc;
  border-right-width: 1px;
  margin-right: 10px;
`;

const DayDate = styled.View`
  flex-direction: row;

  padding: 0 0 20px;
`;

const CardsList = styled.View``;

const Card = styled.View`
  position: relative;
  border-top-width: 2px;
  border-top-color: #000;

  width: 85%;
  min-height: 100px;

  padding: 20px 0 10px;

  margin-bottom: 40px;
`;

const RelatedCard = styled.View`
  position: relative;

  width: 180px;
  min-height: 120px;

  padding: 5px 0;
`;

interface FlightDateProps {
  timestamp: number;
}

const FlightDate: React.FC<FlightDateProps> = ({ timestamp }) => (
  <Text style={{ fontSize: 14 }}>{format(timestamp, 'hh:mm')}</Text>
);

interface FlightDurationProps {
  origin: number;
  destination: number;
}

const FlightDuration: React.FC<FlightDurationProps> = ({ origin, destination }) => {
  const originDay = format(callibrateDate(origin), 'dd');
  const destinationDay = format(callibrateDate(destination), 'dd');
  const showOvernightIcon = originDay !== destinationDay;

  return (
    <View style={{ paddingBottom: 8 }}>
      <Text style={{ fontSize: 16, paddingBottom: 5, fontWeight: 'bold' }}>Flight</Text>
      <Text>
        <FlightDate timestamp={origin} />
        {' - '}
        <FlightDate timestamp={destination} />
        {showOvernightIcon && (
          <>
            {' '}
            <Image source={require('../../../assets/overnight.png')} style={{ width: 16, height: 16 }} />
          </>
        )}
      </Text>
    </View>
  );
};

const CardFlight: React.FC<Omit<CardFlighData, 'kind'>> = props => (
  <Card>
    <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
      <View style={{ position: 'relative' }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{props.origin.airport}</Text>

        {props.origin.terminal && (
          <View style={{ position: 'absolute', top: -5, right: -20, width: 20 }}>
            <Text style={{ fontSize: 14 }}>{props.origin.terminal}</Text>
          </View>
        )}
      </View>

      <View style={{ paddingLeft: 15, paddingRight: 15 }}>
        <Text style={{ fontSize: 32 }}> → </Text>
      </View>

      <View style={{ position: 'relative' }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{props.destination.airport}</Text>

        {props.destination.terminal && (
          <View style={{ position: 'absolute', top: -5, right: -20, width: 20 }}>
            <Text style={{ fontSize: 14 }}>{props.destination.terminal}</Text>
          </View>
        )}
      </View>
    </View>

    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 10,
      }}
    >
      <Text style={{ fontSize: 16 }}>{props.company}</Text>

      <Text> </Text>

      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>#</Text>
      <Text style={{ fontSize: 16 }}>{props.number}</Text>
    </View>

    <FlightDuration origin={props.origin.timestamp} destination={props.destination.timestamp} />
  </Card>
);

const accommodationProvidersColorsMap = {
  booking: '#003580',
  airbnb: '#FF5A5F',
};

interface AccommodationTimingProps {
  range: number[];
}

interface AccommodationDateProps {
  timestamp: number;
}

const TimeFormatter: React.FC<AccommodationDateProps> = ({ timestamp }) => (
  <Text style={{ fontSize: 14 }}>{format(timestamp, 'hh:mm')}</Text>
);

const Timing: React.FC<AccommodationTimingProps> = ({ range }) => (
  <View style={{ paddingBottom: 5 }}>
    <Text>
      <TimeFormatter timestamp={range[0]} />
      {range[1] && (
        <Text>
          {' '}
          - <TimeFormatter timestamp={range[1]} />
        </Text>
      )}
    </Text>
  </View>
);

enum AccommodationActions {
  'check-in' = 'Check-in',
  'check-out' = 'Check-out',
}

enum AccommodationProviders {
  'booking' = 'Booking.com',
  'airbnb' = 'AirBnB',
}

const CardAccomodation: React.FC<Omit<CardAccomodationData, 'kind'>> = props => (
  <Card>
    <Text style={{ fontSize: 28, fontWeight: 'bold', paddingBottom: 10 }}>{props.title}</Text>

    <View>
      <View
        style={{
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        <Text style={{ fontSize: 16, lineHeight: 20 }}>{AccommodationProviders[props.provider]}</Text>

        <Text
          style={{
            fontSize: 8,
            color: accommodationProvidersColorsMap[props.provider],
            lineHeight: 12,
          }}
        >
          ●
        </Text>
      </View>

      <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 8 }}>
        {AccommodationActions[props['check-in'] ? 'check-in' : 'check-out']}
      </Text>

      <Timing range={props['check-in'] || props['check-out']} />
    </View>
  </Card>
);

const CardPoint: React.FC<Omit<CardPointData, 'kind'>> = props => (
  <Card>
    <Text style={{ fontSize: 28, fontWeight: 'bold', paddingBottom: 10 }}>{props.title}</Text>

    {props.hours && (
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Hours</Text>

        <Timing range={props.hours} />
      </View>
    )}
  </Card>
);

const InstaPoint: React.FC<Omit<CardInstaPointData, 'kind'>> = props => (
  <Card>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 5,
      }}
    >
      <Image source={{ uri: props.post.image }} style={{ width: 100, height: 100, borderRadius: 5 }} />

      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          paddingLeft: 10,
          maxWidth: 190,
        }}
      >
        {props.title}
      </Text>
    </View>

    {props.hours && (
      <View>
        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Hours: </Text>

        <Timing range={props.hours} />
      </View>
    )}

    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', width: 75 }}>
      <Text style={{ fontSize: 12 }}>Point on map</Text>
    </View>
  </Card>
);

const InstaCollectionPoint: React.FC<Omit<CardInstaPointData, 'kind'>> = props => (
  <RelatedCard>
    <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
      <Image source={{ uri: props.post.image }} style={{ width: 50, height: 50, borderRadius: 5 }} />

      <View style={{ paddingLeft: 5, maxWidth: 125 }}>
        <Text style={{ fontSize: 13, paddingBottom: 5 }}>{props.title}</Text>
        {props.notes &&
          props.notes.map((note, n) => {
            return (
              <Text style={{ fontSize: 11, paddingBottom: 5 }} key={n}>
                {note.content}
              </Text>
            );
          })}
      </View>
    </View>

    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', width: 75 }}>
      <Text style={{ fontSize: 12 }}>Point on map</Text>
    </View>
  </RelatedCard>
);

const cardsMap = {
  flight: CardFlight,
  accommodation: CardAccomodation,
  userPlace: CardPoint,
  instaPlace: InstaPoint,
};

const collectionCardsMap = {
  instaPlace: InstaCollectionPoint,
};

const callibrateDate = (date: number | Date) => addMonths(toDate(date), -1);

export const TravelPlan: React.FC = () => (
  <TravelPlanPresenter>
    <View style={{ position: 'absolute', top: 0 }}>
      <Title lvl={1}>Philippines</Title>

      <CollectionPresenter>
        <Title lvl={2}>Related</Title>

        <CollectionCarousel horizontal>
          {collectionData.map((card, h) => {
            const CardRenderer: React.ComponentType = collectionCardsMap[card.kind];

            return CardRenderer ? <CardRenderer key={h} {...card} /> : null;
          })}
        </CollectionCarousel>
      </CollectionPresenter>
    </View>

    <ScrollView>
      <Swiper showsPagination={false} showsButtons={false} loop={false}>
        {travelData.days.sort().map((timestamp, i) => {
          const currentDate = callibrateDate(timestamp);
          const isWeekend = isSunday(currentDate) || isSaturday(currentDate);
          const dayCards = travelData.cards.filter(card => card.timestamp === timestamp);
          const dayColor = isWeekend ? '#db6388' : '#000';

          const cards = dayCards
            .map((card, j) => {
              const CardRenderer: React.ComponentType<any> = cardsMap[card.kind];

              return CardRenderer ? <CardRenderer key={j} {...card} /> : null;
            })
            .filter(Boolean);

          return cards.length ? (
            <Day key={i}>
              <DayDate>
                <View style={{ paddingRight: 5 }}>
                  <Text style={{ fontSize: 48, lineHeight: 48, color: dayColor }}>{format(currentDate, 'dd')}</Text>
                </View>

                <Text style={{ fontSize: 18, color: dayColor }}>{format(currentDate, 'LLL')}</Text>
              </DayDate>

              <CardsList>{cards}</CardsList>
            </Day>
          ) : null;
        })}
      </Swiper>
    </ScrollView>
  </TravelPlanPresenter>
);
