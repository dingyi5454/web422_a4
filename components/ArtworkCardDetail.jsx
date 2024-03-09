import { Card } from 'react-bootstrap';

const ArtworkCardDetail = ({ objectID }) => {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const { primaryImage, objectDate, classification, medium, artistDisplayName, creditLine, dimensions, artistWikidata_URL } = data;

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={primaryImage} />}
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          Object Date: {objectDate || 'N/A'}<br />
          Classification: {classification || 'N/A'}<br />
          Medium: {medium || 'N/A'}<br />
          Artist: {artistDisplayName || 'N/A'}<br />
          Credit Line: {creditLine || 'N/A'}<br />
          Dimensions: {dimensions || 'N/A'}<br />
          {artistWikidata_URL && <a href={artistWikidata_URL} target="_blank" rel="noreferrer">Wiki</a>}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
