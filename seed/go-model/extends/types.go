// This file was auto-generated by Fern from our API Definition.

package extends

import (
	json "encoding/json"
	fmt "fmt"
	core "github.com/extends/fern/core"
)

type Docs struct {
	Docs string `json:"docs" url:"docs"`

	extraProperties map[string]interface{}
}

func (d *Docs) GetExtraProperties() map[string]interface{} {
	return d.extraProperties
}

func (d *Docs) UnmarshalJSON(data []byte) error {
	type unmarshaler Docs
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*d = Docs(value)

	extraProperties, err := core.ExtractExtraProperties(data, *d)
	if err != nil {
		return err
	}
	d.extraProperties = extraProperties

	return nil
}

func (d *Docs) String() string {
	if value, err := core.StringifyJSON(d); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", d)
}

type ExampleType struct {
	Docs string `json:"docs" url:"docs"`
	Name string `json:"name" url:"name"`

	extraProperties map[string]interface{}
}

func (e *ExampleType) GetExtraProperties() map[string]interface{} {
	return e.extraProperties
}

func (e *ExampleType) UnmarshalJSON(data []byte) error {
	type unmarshaler ExampleType
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*e = ExampleType(value)

	extraProperties, err := core.ExtractExtraProperties(data, *e)
	if err != nil {
		return err
	}
	e.extraProperties = extraProperties

	return nil
}

func (e *ExampleType) String() string {
	if value, err := core.StringifyJSON(e); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", e)
}

type Json struct {
	Docs string `json:"docs" url:"docs"`
	Raw  string `json:"raw" url:"raw"`

	extraProperties map[string]interface{}
}

func (j *Json) GetExtraProperties() map[string]interface{} {
	return j.extraProperties
}

func (j *Json) UnmarshalJSON(data []byte) error {
	type unmarshaler Json
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*j = Json(value)

	extraProperties, err := core.ExtractExtraProperties(data, *j)
	if err != nil {
		return err
	}
	j.extraProperties = extraProperties

	return nil
}

func (j *Json) String() string {
	if value, err := core.StringifyJSON(j); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", j)
}

type NestedType struct {
	Docs string `json:"docs" url:"docs"`
	Raw  string `json:"raw" url:"raw"`
	Name string `json:"name" url:"name"`

	extraProperties map[string]interface{}
}

func (n *NestedType) GetExtraProperties() map[string]interface{} {
	return n.extraProperties
}

func (n *NestedType) UnmarshalJSON(data []byte) error {
	type unmarshaler NestedType
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*n = NestedType(value)

	extraProperties, err := core.ExtractExtraProperties(data, *n)
	if err != nil {
		return err
	}
	n.extraProperties = extraProperties

	return nil
}

func (n *NestedType) String() string {
	if value, err := core.StringifyJSON(n); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", n)
}
