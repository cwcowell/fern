<?php

namespace <%= namespace%>;

use PHPUnit\Framework\TestCase;
use <%= coreNamespace%>\SerializableType;
use <%= coreNamespace%>\JsonProperty;
use <%= coreNamespace%>\DateType;
use <%= coreNamespace%>\ArrayType;
use DateTime;
use <%= coreNamespace%>\Union;

class TestNestedType1 extends SerializableType
{
    /**
     * @var DateTime $nestedProperty
     */
    #[JsonProperty('nested_property')]
    #[DateType(DateType::TYPE_DATE)]
    public DateTime $nestedProperty;

    /**
     * @param array{
     *   nestedProperty: DateTime,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->nestedProperty = $values['nestedProperty'];
    }
}

class TestType extends SerializableType
{
    /**
     * @var TestNestedType1 nestedType
     */
    #[JsonProperty('nested_type')]
    public TestNestedType1 $nestedType;    /**

     * @var string $simpleProperty
     */
    #[JsonProperty('simple_property')]
    public string $simpleProperty;

    /**
     * @var DateTime $dateProperty
     */
    #[DateType(DateType::TYPE_DATE)]
    #[JsonProperty('date_property')]
    public DateTime $dateProperty;

    /**
     * @var DateTime $datetimeProperty
     */
    #[DateType(DateType::TYPE_DATETIME)]
    #[JsonProperty('datetime_property')]
    public DateTime $datetimeProperty;

    /**
     * @var array<string> $stringArray
     */
    #[ArrayType(['string'])]
    #[JsonProperty('string_array')]
    public array $stringArray;

    /**
     * @var array<string, int> $mapProperty
     */
    #[ArrayType(['string' => 'integer'])]
    #[JsonProperty('map_property')]
    public array $mapProperty;

    /**
     * @var array<int, TestNestedType1|null> $objectArray
     */
    #[ArrayType(['integer' => new Union(TestNestedType1::class, 'null')])]
    #[JsonProperty('object_array')]
    public array $objectArray;

    /**
     * @var array<int, array<int, string|null>> $nestedArray
     */
    #[ArrayType(['integer' => ['integer' => new Union('string', 'null')]])]
    #[JsonProperty('nested_array')]
    public array $nestedArray;

    /**
     * @var array<string|null> $datesArray
     */
    #[ArrayType([new Union('date', 'null')])]
    #[JsonProperty('dates_array')]
    public array $datesArray;

    /**
     * @var string|null $nullableProperty
     */
    #[JsonProperty('nullable_property')]
    public ?string $nullableProperty;

    /**
     * @param array{
     *   nestedType: TestNestedType1,
     *   simpleProperty: string,
     *   dateProperty: DateTime,
     *   datetimeProperty: DateTime,
     *   stringArray: array<string>,
     *   mapProperty: array<string, int>,
     *   objectArray: array<int, TestNestedType1|null>,
     *   nestedArray: array<int, array<int, string|null>>,
     *   datesArray: array<string|null>,
     *   nullableProperty?: string|null,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->nestedType = $values['nestedType'];
        $this->simpleProperty = $values['simpleProperty'];
        $this->dateProperty = $values['dateProperty'];
        $this->datetimeProperty = $values['datetimeProperty'];
        $this->stringArray = $values['stringArray'];
        $this->mapProperty = $values['mapProperty'];
        $this->objectArray = $values['objectArray'];
        $this->nestedArray = $values['nestedArray'];
        $this->datesArray = $values['datesArray'];
        $this->nullableProperty = $values['nullableProperty'] ?? null;
    }
}

class TestTypeTest extends TestCase
{
    /**
     * Test serialization and deserialization of all types in TestType
     */
    public function testSerializationAndDeserialization(): void
    {
        // Create test data
        $data = [
            'nested_type' => ['nested_property' => '1995-07-20'],
            'simple_property' => 'Test String',
            // 'nullable_property' is omitted to test null serialization
            'date_property' => '2023-01-01',
            'datetime_property' => '2023-01-01T12:34:56+00:00',
            'string_array' => ['one', 'two', 'three'],
            'map_property' => ['key1' => 1, 'key2' => 2],
            'object_array' => [
                1 => ['nested_property' =>  '2021-07-20'],
                2 => null, // Testing nullable objects in array
            ],
            'nested_array' => [
                1 => [1 => 'value1', 2 => null], // Testing nullable strings in nested array
                2 => [3 => 'value3', 4 => 'value4']
            ],
            'dates_array' => ['2023-01-01', null, '2023-03-01'] // Testing nullable dates in array
        ];

        $json = json_encode($data, JSON_THROW_ON_ERROR);

        $object = TestType::fromJson($json);

        $serializedJson = $object->toJson();

        $this->assertJsonStringEqualsJsonString($json, $serializedJson, 'The serialized JSON does not match the original JSON.');

        // Check that nullable property is null and not included in JSON
        $this->assertNull($object->nullableProperty, 'Nullable property should be null.');
        // @phpstan-ignore-next-line
        $this->assertFalse(array_key_exists('nullable_property', json_decode($serializedJson, true)), 'Nullable property should be omitted from JSON.');

        // Check date properties
        $this->assertInstanceOf(DateTime::class, $object->dateProperty, 'date_property should be a DateTime instance.');
        $this->assertEquals('2023-01-01', $object->dateProperty->format('Y-m-d'), 'date_property should have the correct date.');

        $this->assertInstanceOf(DateTime::class, $object->datetimeProperty, 'datetime_property should be a DateTime instance.');
        $this->assertEquals('2023-01-01 12:34:56', $object->datetimeProperty->format('Y-m-d H:i:s'), 'datetime_property should have the correct datetime.');

        // Check scalar arrays
        $this->assertEquals(['one', 'two', 'three'], $object->stringArray, 'string_array should match the original data.');
        $this->assertEquals(['key1' => 1, 'key2' => 2], $object->mapProperty, 'map_property should match the original data.');

        // Check object array with nullable elements
        $this->assertInstanceOf(TestNestedType1::class, $object->objectArray[1], 'object_array[1] should be an instance of TestNestedType1.');
        $this->assertEquals('2021-07-20', $object->objectArray[1]->nestedProperty->format('Y-m-d'), 'object_array[1]->nestedProperty should match the original data.');
        $this->assertNull($object->objectArray[2], 'object_array[2] should be null.');

        // Check nested array with nullable strings
        $this->assertEquals('value1', $object->nestedArray[1][1], 'nested_array[1][1] should match the original data.');
        $this->assertNull($object->nestedArray[1][2], 'nested_array[1][2] should be null.');
        $this->assertEquals('value3', $object->nestedArray[2][3], 'nested_array[2][3] should match the original data.');
        $this->assertEquals('value4', $object->nestedArray[2][4], 'nested_array[2][4] should match the original data.');

        // Check dates array with nullable DateTime objects
        $this->assertInstanceOf(DateTime::class, $object->datesArray[0], 'dates_array[0] should be a DateTime instance.');
        $this->assertEquals('2023-01-01', $object->datesArray[0]->format('Y-m-d'), 'dates_array[0] should have the correct date.');
        $this->assertNull($object->datesArray[1], 'dates_array[1] should be null.');
        $this->assertInstanceOf(DateTime::class, $object->datesArray[2], 'dates_array[2] should be a DateTime instance.');
        $this->assertEquals('2023-03-01', $object->datesArray[2]->format('Y-m-d'), 'dates_array[2] should have the correct date.');
    }
}
